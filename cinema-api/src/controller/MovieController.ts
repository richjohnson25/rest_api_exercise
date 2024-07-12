import { Request, Response } from "express"
import { readMovieFileSync, readTransactionFileSync } from "../utils/fileSystem"

export const GetMovies = async(req: Request, res: Response) => {
    try {
        const {status, time, date} = req.query
        const {movies} = readMovieFileSync()
        const {transactions} = readTransactionFileSync()

        if(!status && !date && !time){
            res.status(200).send({
                error: false,
                message: 'Successfully Get All Movies!',
                data: movies
            })
        }

        if(status){
            const moviesByStatus = movies.filter((item: any) => {
                return item.status === status.split('%').join(' ').toUpperCase()
            })
            
            res.status(200).send({
                error: false,
                message: 'Successfully Get All Movies!',
                data: moviesByStatus
            })
        }

        if(date && time){
            const moviesOnShowing = movies.filter((item: any) => {
                return item.status === "ON SHOWING"
            })

            moviesOnShowing.forEach((item: any) => {
                let totalBookSeat = 0
                transactions.forEach((trans: any) => {    
                    if(item.id === trans.movies_id){
                        if(date === trans.date && time === trans.time){
                            totalBookSeat += trans.total_seat
                        }
                    }
                })
                item.seat_available = item.total_seat - totalBookSeat
            })

            res.status(200).send({
                error: false,
                message: 'Successfully Get All Movies!',
                data: moviesOnShowing
            })
        }
    } catch (error){
        console.log(error)
    }
}