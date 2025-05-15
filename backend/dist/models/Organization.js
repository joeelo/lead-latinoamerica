"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const mongoose_1 = __importDefault(require("../mongoose"));
const orgSchema = new mongoose_1.default.Schema({
    organization: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        max: 200,
        required: true,
    },
    missionStatement: {
        type: String,
        default: '',
        max: 500,
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
    email: {
        type: String,
        required: true,
    },
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
    orgLogo: {
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
});
// @ts-ignore
const Organization = new mongoose_1.default.model('Organization', orgSchema, 'programs');
exports.Organization = Organization;
