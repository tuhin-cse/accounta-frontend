"use client"

import {Form} from "antd";
import FormInput from "../../components/form/input";
import Button from "../../components/common/button";
import FormPassword from "../../components/form/password";
import {postRegister} from "../../helpers/backend";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {hideLoader, showLoader} from "../../components/common/loader";


const Register = () => {
    const router = useRouter()
    const [error, setError] = useState(null)

    useEffect(() => {
        hideLoader()
    }, [])
    const handleSubmit = async (values) => {
        setError(null)
        showLoader()
        const {error, msg, data} = await postRegister(values)
        if(error) {
            hideLoader()
            setError(msg)
        } else {
            localStorage.setItem('token', data.token)
            return router.push('/')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center items-center sm:py-12">
            <div className="relative p-4 bg-white shadow-lg sm:rounded sm:p-8 w-[90vw] sm:w-[450px]">
                <div className="mb-6">
                    <h1 className="text-2xl text-gray-700 font-semibold">Register</h1>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <div className="divide-y divide-gray-200">
                    <div className="text-base text-gray-700 sm:text-lg sm:leading-7">
                        <Form layout="vertical" onFinish={handleSubmit}>
                            <FormInput
                                label="Your Name"
                                name="name"
                                initialValue=""
                                required/>
                            <FormInput
                                label="Email"
                                name="email"
                                isEmail
                                initialValue=""
                                required/>
                            <FormPassword
                                label="Password"
                                name="password"
                                initialValue=""
                                required/>
                            <FormPassword
                                label="Confirm Password"
                                name="confirm_password"
                                initialValue=""
                                confirm
                                required/>
                            <Button className="mt-2">Submit</Button>
                        </Form>
                        <p className="mt-4 text-sm">Already have an account? <Link href="/login" className="text-indigo-500">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;