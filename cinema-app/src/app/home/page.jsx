'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function Homepage(){
    const [movies, setMovies] = useState([])

    const onGetMovies = async() => {
        try {
            const respond = await axios.get('http://localhost:5000/movies')
            console.log(respond.data.data)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        onGetMovies()
    }, [])

    return (
        <>
            <section className="py-5">
                <div className="flex flex-col gap-5">
                    {
                        movies?.map((item, index) => {
                            return (
                                <div className="border">
                                    <h1>{item?.title}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}