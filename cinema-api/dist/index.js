"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileSystem_1 = require("./utils/fileSystem");
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 5000;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('<h1>REST API Exercise</h1>');
});
app.use(router_1.default);
// Register
app.post('/auth/register', (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new Error('User Data Must Be Complete!');
        }
        const data = (0, fileSystem_1.readUserFileSync)();
        let isUserRegistered = false;
        data.users.forEach((item) => {
            if (item.email === email) {
                isUserRegistered = true;
            }
        });
        if (isUserRegistered) {
            return res.send({
                error: true,
                message: "Email Already in Use",
                data: null
            });
        }
        data.users.push({ uid: Date.now(), username, email, password, role: 'USER' });
        (0, fileSystem_1.writeUserFileSync)(data);
        res.status(201).send({
            error: false,
            message: 'Register Success!',
            data: null
        });
    }
    catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        });
    }
});
// Login
app.get('/auth/login', (req, res) => {
    try {
        const { username, password } = req.query;
        const data = (0, fileSystem_1.readUserFileSync)();
        const userDetail = data.users.find((item) => item.username === username && item.password === password);
        if (!userDetail)
            throw { status: 404, message: 'User Not Found!' };
        res.status(200).send({
            error: false,
            message: 'Login Success!',
            data: userDetail
        });
    }
    catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        });
    }
});
// Get all movies
app.get('/movies', (req, res) => {
    const data = (0, fileSystem_1.readMovieFileSync)();
    res.send({
        data: data.movies
    });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
