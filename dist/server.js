"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pondlive_1 = require("@eleven-am/pondlive");
var views_1 = require("./views");
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var router = new pondlive_1.Router();
router.mount('/', views_1.Index);
router.addStaticRoute(path_1.default.join(__dirname, './dist'));
var app = router.serveWithExpress('/', (0, express_1.default)());
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
