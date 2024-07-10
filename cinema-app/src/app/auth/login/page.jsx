'use client'
import { LoginSchema } from "@/features/schemas/loginSchema";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";

export default function LoginPage(){
    const router = useRouter()

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const onLogin = async(_values) => {
        try {
            setIsLoading(true)
            const respond = await axios.get(`http://localhost:5000/auth/login?username=${_values.username}&password=${_values.password}`)
            if(respond.data.password !== _values.password){
                throw {
                    message: 'Account Not Found!'
                }
            }
            toast.success('Login Success!')
            dispatch(setUser(respond.data))
            router.push('/movies')
        } catch (error){
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <section className="flex justify-center py-10 border">
                <div className="w-[50%]">
                    <h1 className="flex justify-center text-3xl font-bold">Login</h1>
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => {
                            onLogin(values)
                        }}
                    >
                        {
                            ({dirty, isValid}) => {
                                return (
                                    <Form>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Username</span>
                                            </div>
                                            <Field name="username" type="text" placeholder="Type here" className="input input-bordered w-full ring-1" />
                                        </label>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Password</span>
                                            </div>
                                            <Field name="password" type="password" placeholder="Type here" className="input input-bordered w-full ring-1" />
                                        </label>
                                        <button disabled={!(dirty && isValid) || isLoading} type="submit" className="btn bg-cyan-600 text-white w-full mt-5">Login</button>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </div>
            </section>
        </>
    )
}