import { Request, Response } from "express"
import { readUserFileSync, writeUserFileSync } from "../utils/fileSystem"
import { IError, IUser } from "../types"

export const RegisterUser = async(req: Request, res: Response) => {
    try {
        // 1. Get data from req.body
        // 2. Create interface
        // 3. Read users-db.json
        // 4. Validation
        // 5. Create UID
        // 6. Add data from req.body
        // 7. Write new data
        // 8. Send response
        const {email, username, password} = req.body

        const data = readUserFileSync()
        
        data.users.forEach((item: IUser, index: number) => {
            if(item.username === username) throw {message: 'Username Already Exist'}
            if(item.email === email) throw {message: 'Email Already Exist'}
        })

        data.users.push({uid: Date.now(), email, username, password, })

        writeUserFileSync(data)

        res.status(201).send({
            error: false,
            message: 'Register Success!',
            data: {}
        })
    } catch (error){
        res.status((error as IError).status || 500).send({
            error: true,
            message: (error as IError).message,
            data: {}
        })
    }
}

export const LoginUser = async(req: Request, res: Response) => {
    try {
        // 1. Get data from req.body
        const {usernameOrEmail, password} = req.body

        // 2. Read users-db.json
        const data = readUserFileSync()

        // 3. Validation
        const findUser = data.users.find((item: IUser) => {
            return ((item.email === usernameOrEmail || item.username === usernameOrEmail) && item.password === password)
        })
        
        // 4. Send response
        if(findUser === undefined) return res.status(401).send({
            error: true,
            message: 'Login Failed!',
            data: {}
        })

        if(findUser) return res.status(200).send({
            error: false,
            message: 'Login Success!',
            data: {
                uid: findUser.uid,
                email: findUser.email,
                role: findUser.role
            }
        })
    } catch (error){
        console.log(error)
    }
}