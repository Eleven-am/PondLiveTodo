import {PondLive} from "@eleven-am/pondlive";
import {Index} from "./views";
import path from "path";
import express from "express";

/**
 * This is the main entry point for the server, it is responsible for creating the pond, and setting up the server.
 * An express server can be used but the instantiating process looks a little different
 */
const server = PondLive(express());

/**
 * If you would like to add custom js/css files to the client
 * You will need to create a generic HTML file, add those files in the head and body as normal
 * To use the file, you will need to provide the path to the file to the usePondLive function
 */
server.use((req, _res, next) => {
    console.log(req.url);
    next();
});

/**
 * The usePondLive function is used to add the parent components to the pond
 * These components are the main components that are rendered to the client
 */
server.usePondLive([{
    path: '/',  // A path to which the component will be mounted
    Component: Index // The component to be mounted
}],  {
    staticPath: path.join(__dirname, './dist'), // The path to the static files
    secret: '8011d716-de08-4dad-94eb-4176251682d5' // The secret used to sign the JWT
});

const port = Number(process.env.PORT || 3000);

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

/**
 * There are a lot more features on pondsocket that are not covered in this example
 * For more information, please visit the documentation
 */
