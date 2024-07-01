'use client'
import { registerSchema } from "@/features/schemas/registerSchema";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

export default function RegisterPage(){
    const onRegister = async(_values, _resetForm) => {
        try {
            await axios.post(`http://localhost:5000/auth/register`, _values)

            toast.success('Register Success!')
            _resetForm()
        } catch (error){
            console.log(error)
        }
    }
    return (
        <>
            <section className="flex justify-center py-10 border gap-2">
                <div className="w-[50%]">
                    <h1 className="flex justify-center text-3xl font-bold">Register</h1>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={registerSchema}
                        onSubmit={(values, {resetForm}) => {
                            onRegister(values, resetForm)
                        }}
                    >
                        {
                            ({dirty, isValid}) => {
                                return (
                                    <Form className="flex flex-col gap-2 items-center">
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Username</span>
                                            </div>
                                            <Field name="username" type="text" placeholder="Type here" className="input input-bordered w-full ring-1" />
                                        </label>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Email</span>
                                            </div>
                                            <Field name="email" type="text" placeholder="Type here" className="input input-bordered w-full ring-1" />
                                        </label>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Password</span>
                                            </div>
                                            <Field name="password" type="password" placeholder="Type here" className="input input-bordered w-full ring-1" />
                                        </label>
                                        <button disabled={!(dirty && isValid)} type="submit" className="btn bg-cyan-600 text-white w-[20%] mt-5 rounded py-3">Register</button>
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