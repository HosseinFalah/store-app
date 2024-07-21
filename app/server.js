const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const createHttpError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

const { AllRoutes } = require('./router/router');

module.exports = class Application {
    #app = express();
    #DB_URL;
    #PORT;

    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication();
        this.initRedis();
        this.connectToMongooDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    };

    configApplication() {
        this.#app.use(cors());
        this.#app.use(morgan('dev'));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
        this.#app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "store app",
                    version: "1.0.0",
                    description: "store app use nodejs express mongodb redis develop",
                    contact: {
                        name: "Hossein Falah",
                        url: "http://localhost:5000",
                        email: "hosseinfalah2021@gmail.com",
                    }
                },
                servers: [
                    {
                        url: "http://localhost:5000"
                    }
                ]
            },
            apis: ['./app/router/**/*.js']
        }), { explorer: true }));
    };

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
            console.log(error.message);
        });

        mongoose.connection.on('connected', () => {
            console.log("mongoose connected to DB");
        });

        mongoose.connection.on('disconnected', () => {
            console.log("mongoose connection is disconnected");
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    }

    initRedis() {
        require("./utils/init_redis").initRedis();
    }

    createRoutes() {
        this.#app.use(AllRoutes);
    }

    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createHttpError.NotFound("آدرس مورد نظر یافت نشد"))
        });

        this.#app.use((error, req, res, next) => {
            const serverError = createHttpError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({ 
                data: null,
                errors: {
                    statusCode,
                    message
                }
            });
        })
    }
};