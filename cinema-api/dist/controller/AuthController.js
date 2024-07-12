"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.RegisterUser = void 0;
const fileSystem_1 = require("../utils/fileSystem");
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Get data from req.body
        // 2. Create interface
        // 3. Read users-db.json
        // 4. Validation
        // 5. Create UID
        // 6. Add data from req.body
        // 7. Write new data
        // 8. Send response
        const { email, username, password } = req.body;
        const data = (0, fileSystem_1.readUserFileSync)();
        data.users.forEach((item, index) => {
            if (item.username === username)
                throw { message: 'Username Already Exist' };
            if (item.email === email)
                throw { message: 'Email Already Exist' };
        });
        data.users.push({ uid: Date.now(), email, username, password, });
        (0, fileSystem_1.writeUserFileSync)(data);
        res.status(201).send({
            error: false,
            message: 'Register Success!',
            data: {}
        });
    }
    catch (error) {
        res.status(error.status || 500).send({
            error: true,
            message: error.message,
            data: {}
        });
    }
});
exports.RegisterUser = RegisterUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Get data from req.body
        const { usernameOrEmail, password } = req.body;
        // 2. Read users-db.json
        const data = (0, fileSystem_1.readUserFileSync)();
        // 3. Validation
        const findUser = data.users.find((item) => {
            return ((item.email === usernameOrEmail || item.username === usernameOrEmail) && item.password === password);
        });
        // 4. Send response
        if (findUser === undefined)
            return res.status(401).send({
                error: true,
                message: 'Login Failed!',
                data: {}
            });
        if (findUser)
            return res.status(200).send({
                error: false,
                message: 'Login Success!',
                data: {
                    uid: findUser.uid,
                    email: findUser.email,
                    role: findUser.role
                }
            });
    }
    catch (error) {
        console.log(error);
    }
});
exports.LoginUser = LoginUser;
