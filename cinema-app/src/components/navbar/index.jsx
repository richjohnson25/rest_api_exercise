'use client'
import { setUserLogout } from "@/redux/slices/userSlice"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"

export default function Navbar(){
    const dataUser = useSelector((state) => state.user.user)

    const dispatch = useDispatch()

    return (
        <main className="flex justify-between items-center bg-cyan-600 px-10 py-3 text-white">
            <section>
                <Link href={"/"}>
                    <h1 className="font-bold text-2xl">Cinema App</h1>
                </Link>
            </section>
            <section className="flex gap-3">
                {
                    dataUser === null?
                    <>
                        <Link href={"/auth/register"}>
                            <div className="bg-yellow-300 text-black px-2 py-2 rounded-md">Register</div>
                        </Link>
                        <Link href={"/auth/login"}>
                            <div className="bg-yellow-300 text-black px-2 py-2 rounded-md">Login</div>
                        </Link>
                    </>
                    :
                    <div className="flex items-center gap-1">
                        {dataUser[0]?.username}
                        <button onClick={() => dispatch(setUserLogout())} className="btn bg-white text-black">Logout</button>
                    </div>
                }
            </section>
        </main>
    )
}