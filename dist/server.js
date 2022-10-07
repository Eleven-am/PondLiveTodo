"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pondsocket_1 = require("pondsocket");
var path_1 = __importDefault(require("path"));
var views_1 = require("./views");
/**
 * This is the main entry point for the server, it is responsible for creating the pond, and setting up the server.
 * An express server can be used but the instantiating process looks a little different
 */
var server = new pondsocket_1.PondServer();
/**
 * If you would like to add custom js/css files to the client
 * You will need to create a generic HTML file, add those files in the head and body as normal
 * To use the file, you will need to provide the path to the file to the usePondLive function
 */
var staticPath = path_1.default.join(__dirname, './src/index.html');
/**
 * The useStatic function is used to serve static files to the client
 * NB right now it isn't possible to have the html file in the same directory as the static files
 */
server.useStatic(path_1.default.join(__dirname, './dist'));
/**
 * The usePondLive function is used to add the parent components to the pond
 * These components are the main components that are rendered to the client
 */
server.usePondLive([{
        path: '/',
        Component: views_1.Index // The component to be mounted
    }], {
    index: staticPath,
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
