import express from "express";

class BaseRoutes {
    constructor(controller) {
        this.controller = controller;
        this.router = express.Router();
        this.initializeRoutes();
    }

    getRouter() {
        return this.router;
    }
}

export default BaseRoutes;