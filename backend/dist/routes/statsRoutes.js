"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dayjs_1 = __importDefault(require("dayjs"));
const Program_1 = __importDefault(require("../models/Program"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.get('/stats/programs', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = {};
        const sixMonthInPast = (0, dayjs_1.default)().subtract(6, 'month').toDate();
        const programs = yield Program_1.default.find({
            approved: true,
            createdAt: { $gt: sixMonthInPast },
        }).lean();
        programs.forEach((program) => {
            const programCreatedMonth = (0, dayjs_1.default)(program.createdAt).format('MMMM');
            if (!Number(stats[programCreatedMonth])) {
                stats[programCreatedMonth] = 0;
            }
            stats[programCreatedMonth] += 1;
        });
        res.send({ success: true, message: { stats } });
    }
    catch (error) {
        res.send({ success: false, message: error, error: true });
    }
}));
router.get('/stats/programs/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield User_1.default.findOne({ email }).lean();
        const stats = {};
        const sixMonthInPast = (0, dayjs_1.default)().subtract(6, 'month').toDate();
        const programs = yield Program_1.default.find({
            approved: true,
            createdAt: { $gt: sixMonthInPast },
        }).lean();
        // create a list of months in '03-01-2023' format starting from 6 months ago
        for (let i = 0; i < 6; i++) {
            const month = (0, dayjs_1.default)()
                .subtract(i, 'month')
                .startOf('month')
                .toISOString()
                .split('T')[0];
            stats[month] = { program: 0, user: 0 };
        }
        programs.forEach((program) => {
            const month = (0, dayjs_1.default)(program.createdAt)
                .startOf('month')
                .toISOString()
                .split('T')[0];
            if (stats[month] && stats[month].program > -1) {
                stats[month].program += 1;
            }
        });
        user.savedProgramDates.forEach((program) => {
            const month = (0, dayjs_1.default)(program.dateAdded)
                .startOf('month')
                .toISOString()
                .split('T')[0];
            if (stats[month] && stats[month].user > -1) {
                stats[month].user += 1;
            }
        });
        res.send({ success: true, message: { stats } });
    }
    catch (error) {
        console.log('ERROR', error);
        res.send({ success: false, message: error, error: true });
    }
}));
module.exports = router;
