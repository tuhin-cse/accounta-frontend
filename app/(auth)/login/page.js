"use client"

import {Form} from "antd";
import FormInput from "../../components/form/input";
import Button from "../../components/common/button";
import FormPassword from "../../components/form/password";

const Login = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center items-center sm:py-12">
            <div className="relative p-4 bg-white shadow-lg sm:rounded sm:p-8 w-[90vw] sm:w-[450px]">
                <div className="mb-10">
                    <h1 className="text-2xl text-gray-700 font-semibold">Login</h1>
                </div>
                <div className="divide-y divide-gray-200">
                    <div className="text-base text-gray-700 sm:text-lg sm:leading-7">
                        <Form onFinish={values => {
                            console.log(values)
                        }}>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;