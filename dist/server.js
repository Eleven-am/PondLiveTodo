"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pondlive_1 = require("@eleven-am/pondlive");
var views_1 = require("./views");
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
/**
 * This is the main entry point for the server, it is responsible for creating the pond, and setting up the server.
 * An express server can be used but the instantiating process looks a little different
 */
var server = (0, pondlive_1.PondLive)((0, express_1.default)());
/**
 * If you would like to add custom js/css files to the client
 * You will need to create a generic HTML file, add those files in the head and body as normal
 * To use the file, you will need to provide the path to the file to the usePondLive function
 */
server.use(function (req, _res, next) {
    console.log(req.url);
    next();
});
/**
 * The usePondLive function is used to add the parent components to the pond
 * These components are the main components that are rendered to the client
 */
server.usePondLive([{
        path: '/',
        Component: views_1.Index // The component to be mounted
    }], {
    staticPath: path_1.default.join(__dirname, './'),
    secret: '8011d716-de08-4dad-94eb-4176251682d5' // The secret used to sign the JWT
});
var port = Number(process.env.PORT || 3000);
server.listen(port, function () {
    console.log("Listening on port: ".concat(port));
});
/**
 * There are a lot more features on pondsocket that are not covered in this example
 * For more information, please visit the documentation
 */
