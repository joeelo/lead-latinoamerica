"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("../mongoose"));
const programSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        max: 200,
        required: true,
    },
    bioEs: {
        type: String,
    },
    helpsWith: {
        type: Array,
    },
    coverImage: {
        type: String,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    organization: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Organization',
        },
    ],
    tags: {
        type: Array,
        default: [],
    },
    href: {
        type: String,
        required: true,
    },
    partnerUrl: {
        type: String,
    },
    expirationDate: {
        type: String,
    },
    programType: {
        program: {
            type: Boolean,
            default: false,
        },
        summer: {
            type: Boolean,
            default: false,
        },
        internship: {
            type: Boolean,
            default: false,
        },
        scholarship: {
            type: Boolean,
            default: false,
        },
    },
    approvalEmailSent: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// @ts-ignore
const Program = new mongoose_1.default.model('Program', programSchema, 'programs');
exports.default = Program;
