"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
require("express-async-errors");
const routes_1 = __importDefault(require("@src/routes"));
const misc_1 = require("@src/common/misc");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET || 'mysecret'));
if (process.env.NODE_ENV === misc_1.NodeEnvs.Dev.valueOf()) {
    app.use((0, morgan_1.default)('dev'));
}
if (process.env.NODE_ENV === misc_1.NodeEnvs.Production.valueOf()) {
    app.use((0, helmet_1.default)());
}
app.use('/api', routes_1.default);
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== misc_1.NodeEnvs.Test.valueOf()) {
        console.error(err.stack);
    }
    res.status(500).json({ error: 'Internal Server Error' });
});
const viewsDir = path_1.default.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
app.get('/', (req, res) => {
    res.redirect('/users');
});
app.get('/users', (req, res) => {
    res.sendFile('users.html', { root: viewsDir });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
