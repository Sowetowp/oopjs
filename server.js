import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from 'express-fileupload';
import errorHandler from "./middlewares/error-handler.js";
import admin_router from "./routes/AdminRoutes.js";
import Database from "./config/db.js";


class App {
    constructor() {
        this.app = express();
        this.db = new Database(process.env.MONGO_URI);
        this.port = process.env.PORT || 5000;

        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandler();
    }

    initializeDatabase() {
        this.db.connect();
    }

    initializeMiddlewares() {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
        this.app.use(fileUpload());
    }

    initializeRoutes() {
        this.app.use("/api/admin", admin_router);
    }

    initializeErrorHandler() {
        this.app.use(errorHandler.handleError);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${this.port}`);
        });
    }
}

const appInstance = new App();
appInstance.start();