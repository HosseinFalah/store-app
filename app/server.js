const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');

module.exports = class Application {
    #app = express();
    #DB_URL;
    #PORT;

    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication();
        this.connectToMongooDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    };

    configApplication() {
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
    }

    createServer() {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`server is running in port ${this.#PORT} url: http://localhost:${this.#PORT}`);
        })
    }

    connectToMongooDB() {
        mongoose.connect(this.#DB_URL).then((res) => {
            console.log("Database connected");
        }).catch(error => {
            console.log(error);
        });
    }

    createRoutes() {

    }

    errorHandling() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                statusCode: 404,
                message: 'آدرس مورد نظر یافت نشد'
            });
        });

        this.#app.use((req, res, next) => {
            const statusCode = error.status || 500;
            const message = error.message || "InternalServerError";
            return res.status(statusCode).json({ statusCode, message });
        })
    }
};