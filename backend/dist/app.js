"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("./mongoose"));
const userRoutes_1 = require("./routes/userRoutes");
// eslint-disable-next-line semi
const programRoutes_1 = require("./routes/programRoutes");
const app = (0, express_1.default)();
// import statsRoutes from './routes/statsRoutes'
const server = `mongodb://joeeloee:${process.env.DB_PASSWORD}@cluster0-shard-00-00.nnv78.mongodb.net:27017,cluster0-shard-00-01.nnv78.mongodb.net:27017,cluster0-shard-00-02.nnv78.mongodb.net:27017/lead-latinoamerica?ssl=true&replicaSet=atlas-vtvxq2-shard-0&authSource=admin&retryWrites=true&w=majority`;
// const database = 'lead-latinoamerica';
mongoose_1.default.connect(server, {
    ssl: true,
});
// https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 7000;
// @ts-ignore
app.get('/ping', (_req, res) => res.send('pinged'));
app.use(userRoutes_1.userRoutes);
app.use(programRoutes_1.programRoutes);
// app.use(statsRoutes)
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
