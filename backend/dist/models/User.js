"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("../mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        min: [3, 'name must be longer than that'],
        max: 22,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    preferredName: {
        type: String,
    },
    pronouns: {
        type: String,
    },
    nationality: {
        type: Array,
    },
    grade: {
        type: String,
    },
    interests: {
        type: Array,
    },
    savedPrograms: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Program',
        },
    ],
    savedProgramDates: {
        type: Array,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});
// @ts-ignore
const User = new mongoose_1.default.model('User', userSchema);
exports.default = User;
