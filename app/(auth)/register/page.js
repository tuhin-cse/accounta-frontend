"use client"

import {Form, notification} from "antd";
import FormInput from "../../components/form/input";
import Button from "../../components/common/button";
import FormPassword from "../../components/form/password";
import {postLogin} from "../../helpers/backend";
import Link from "next/link";

const Login = () => {

    const handleSubmit = async (values) => {
        const {error, msg, data} = await postLogin(values)
        if(error) {
            notification.error({
                message: msg
            })
        } else {

        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center items-center sm:py-12">
            <div className="relative p-4 bg-white shadow-lg sm:rounded sm:p-8 w-[90vw] sm:w-[450px]">
                <div className="mb-8">
                    <h1 className="text-2xl text-gray-700 font-semibold">Register</h1>
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

export default Login;