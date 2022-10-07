import {PondServer} from "pondsocket";
import path from "path";
import {Index} from "./views";

/**
 * This is the main entry point for the server, it is responsible for creating the pond, and setting up the server.
 * An express server can be used but the instantiating process looks a little different
 */
const server = new PondServer();

/**
 * If you would like to add custom js/css files to the client
 * You will need to create a generic HTML file, add those files in the head and body as normal
 * To use the file, you will need to provide the path to the file to the usePondLive function
 */
const staticPath = path.join(__dirname, './src/index.html');

server.use((req, _res, next) => {
    console.log(req.url);
    next();
});

/**
 * The useStatic function is used to serve static files to the client
 * NB right now it isn't possible to have the html file in the same directory as the static files
 */
server.useStatic(path.join(__dirname, './dist'));

/**
 * The usePondLive function is used to add the parent components to the pond
 * These components are the main components that are rendered to the client
 */
server.usePondLive([{
    path: '/',  // A path to which the component will be mounted
    Component: Index // The component to be mounted
}],  {
    index: staticPath, // The path to the html file
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
