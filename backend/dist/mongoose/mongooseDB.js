"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("../mongoose"));
const server = `mongodb://joeeloee:${process.env.DB_PASSWORD}@cluster0-shard-00-00.nnv78.mongodb.net:27017,cluster0-shard-00-01.nnv78.mongodb.net:27017,cluster0-shard-00-02.nnv78.mongodb.net:27017/lead-latinoamerica?ssl=true&replicaSet=atlas-vtvxq2-shard-0&authSource=admin&retryWrites=true&w=majority`;
// const database = 'lead-latinoamerica';
mongoose_1.default.connect(server, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    ssl: true,
});
