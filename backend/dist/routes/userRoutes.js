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
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Program_1 = __importDefault(require("../models/Program"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const isLocalEnv = process.env.DEPLOY_ENV === 'local';
router.post('/users/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (user) {
            res.send({
                message: 'user already exists please check and try again',
            });
            return;
        }
        const newUser = new User_1.default();
        newUser.name = req.body.name;
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        yield newUser.save();
        res.send(newUser);
    }
    catch (error) {
        res.send(error);
    }
}));
router.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (user) {
            res.send(user);
        }
        else {
            res.send({ message: 'wrong login info try again' });
        }
    }
    catch (error) {
        res.send(error);
    }
}));
router.get('/user/show/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Make sure whole user object is not being sent back
        const user = yield User_1.default.findOne({ _id: req.params.id })
            .populate('books')
            .exec();
        res.send(user);
    }
    catch (error) {
        res.send(error);
    }
}));
router.put('/user/profile/:email/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const { email } = req.params;
    try {
        const user = yield User_1.default.findOne({ email });
        user.preferredName = data.preferredName || user.preferredName;
        user.grade = data.grade || user.grade;
        user.pronouns = data.pronouns || user.pronouns;
        user.interests = data.interests || user.interests;
        user.nationality = data.nationality || user.nationality;
        const updatedUser = yield user.save();
        res.send({ success: true, user: updatedUser });
    }
    catch (error) {
        res.send(error);
    }
}));
router.post('/profile/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User_1.default.findOne({
            email,
        });
        if (!user) {
            const newUser = new User_1.default();
            newUser.email = email;
            newUser.name = req.body.user.name;
            yield newUser.save();
            res.send({ email, message: 'success', user: newUser });
            return;
        }
        res.send({ email, message: 'success', user });
    }
    catch (error) {
        res.send(error);
    }
}));
router.get('/user/programs/:email/:programId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, programId } = req.params;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.send({
                message: 'you must sign up for an account to save your programs',
                success: true,
            });
            return;
        }
        let foundProgram = null;
        if (user.savedPrograms.length) {
            foundProgram = user.savedPrograms.find((id) => id === programId);
        }
        const foundProgramDate = user.savedProgramDates.find((program) => {
            program.id === programId;
        });
        if (!foundProgramDate) {
            user.savedProgramDates.push({
                id: programId,
                dateAdded: new Date().toISOString(),
            });
        }
        if (!foundProgram) {
            user.savedPrograms.push(programId);
            // https://stackoverflow.com/questions/22278761/mongoose-difference-between-save-and-using-update
            yield user.save();
            res.send({ message: 'Program Saved!', success: true });
            return;
        }
        yield user.save();
        res.send({
            message: 'This program is already saved!',
            success: true,
        });
    }
    catch (error) {
        res.send(error);
    }
}));
// get all users programs
router.get('/user/:email/programs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User_1.default.findOne({ email });
        if (user.savedPrograms.length) {
            const records = yield Program_1.default.find({ _id: { $in: user.savedPrograms } });
            res.send({ programs: records, success: true });
            return;
        }
        res.send({ programs: null, success: true });
    }
    catch (error) {
        res.send({ error, success: false });
    }
}));
// Delete user program
router.delete('/user/programs/:email/:programId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, programId } = req.params;
        const user = yield User_1.default.findOne({ email });
        const updatedPrograms = user.savedPrograms.filter((program) => program.toString() !== programId);
        user.savedPrograms = updatedPrograms;
        yield user.save();
        res.send({ message: 'Program successfully removed', success: true });
    }
    catch (error) {
        res.send({
            message: 'There was a problem removing the program',
            success: false,
        });
    }
}));
// Tests
router.get('/users/email-list', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({ interests: { $in: ['summer'] } }).lean();
        const userEmails = !isLocalEnv
            ? users.map((user) => user.email)
            : ['joeephus@gmail.com'];
        res.send({
            message: 'success',
            data: userEmails,
            sendTo: users.map((user) => user.email),
        });
    }
    catch (error) {
        res.send({ error: true, message: error });
    }
}));
const userRoutes = router;
exports.userRoutes = userRoutes;
