"use client"

import {Form} from "antd";
import FormInput from "../../components/form/input";
import Button from "../../components/common/button";
import FormPassword from "../../components/form/password";
import {postLogin} from "../../helpers/backend";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {hideLoader, showLoader} from "../../components/common/loader";

const Login = () => {
    const router = useRouter()

    const [error, setError] = useState(null)


    useEffect(() => {
        hideLoader()
    }, [])
    const handleSubmit = async (values) => {
        setError(null)
        showLoader()
        const {error, msg, data} = await postLogin(values)
        hideLoader()
        if(error) {
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
                    <h1 className="text-2xl text-gray-700 font-semibold">Login</h1>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <div className="divide-y divide-gray-200">
                    <div className="text-base text-gray-700 sm:text-lg sm:leading-7">
                        <Form layout="vertical" onFinish={handleSubmit}>
                            <FormInput
                                label="Email"
                                name="email"
                                isEmail
                                initialValue="demo@email.com"
                                required/>
                            <FormPassword
                                label="Password"
                                name="password"
                                initialValue="123456"
                                required/>
                            <Button>Submit</Button>
                        </Form>
                        <p className="mt-4 text-sm">Don't have an account? <Link href="/register" className="text-indigo-500">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;