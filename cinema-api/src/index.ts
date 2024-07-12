import express, { Express, Request, Response, Router } from "express";
import { IMovie, IUser } from "./types";
import { readMovieFileSync, readUserFileSync, writeUserFileSync } from "./utils/fileSystem";
import router from "./router";
import cors from "cors";

const app: Express = express();
app.use(express.json());
const port = 5000;
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>REST API Exercise</h1>');
})

app.use(router)

// Register
app.post('/auth/register', (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body

        if(!username || !email || !password){
            throw new Error('User Data Must Be Complete!')
        }

        const data = readUserFileSync()

        let isUserRegistered: boolean = false

        data.users.forEach((item: IUser) => {
            if(item.email === email){
                isUserRegistered = true
            }
        })

        if(isUserRegistered){
            return res.send({
                error: true,
                message: "Email Already in Use",
                data: null
            })
        }

        data.users.push(
            {uid: Date.now(), username, email, password, role: 'USER'}
        )

        writeUserFileSync(data)

        res.status(201).send({
            error: false,
            message: 'Register Success!',
            data: null
        })
    } catch(error){
        res.status(500).send({
            error: true,
            message: (error as Error).message
        })
    }
})

// Login
app.get('/auth/login', (req: Request, res: Response) => {
    try {
        const {username, password} = req.query

        const data = readUserFileSync()

        const userDetail = data.users.find((item: IUser) => item.username === username && item.password === password)

        if(!userDetail) throw {status: 404, message: 'User Not Found!'}

        res.status(200).send({
            error: false,
            message: 'Login Success!',
            data: userDetail
        })
    } catch (error){
        res.status(500).send({
            error: true,
            message: (error as Error).message
        })
    }
})

// Get all movies
app.get('/movies', (req: Request, res: Response) => {
    const data = readMovieFileSync()
    res.send(
        {
            data: data.movies
        }
    )
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})