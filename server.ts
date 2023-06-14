import {Router} from "@eleven-am/pondlive";
import {Index} from "./views";
import path from "path";
import express from "express";

const router = new Router();

router.mount('/', Index);

router.addStaticRoute(path.join(__dirname, './dist'));

const app = router.serveWithExpress('/', express());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
