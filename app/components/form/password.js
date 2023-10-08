"use clint"

import {Form} from 'antd';
import {useState} from "react";
import {BiLockAlt, BiLockOpenAlt} from "react-icons/bi";

const FormPassword = ({name, label, required, placeholder, min = 6, initialValue,  confirm = false, noCurrent = false}) => {
    const t = d => d
    let rules = [
        {required, message: t('Please enter a password')},
        {min: confirm ? 0 : min, message: t('Password must be at least 6 characters')}
    ]

    if (confirm) {
        rules.push(({getFieldValue}) => ({
            validator(_, value) {
                if ((!value && required) || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
        }))
    }

    if (noCurrent) {
        rules.push(({getFieldValue}) => ({
            validator(_, value) {
                if ((!value && required) || getFieldValue('current_password') !== value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error(t("New password can't be same as current password")));
            },
        }))
    }

    return (
        <Form.Item
            name={name}
            className="mb-8"
            rules={rules}
            initialValue={initialValue || ''}
        >
            <PasswordInputField
                className="form-control"
                label={label}
            />
        </Form.Item>
    )
}

export default FormPassword



const PasswordInputField = ({value, onChange, label, ...props}) => {
    const [visible, setVisible] = useState(false)
    return (
        <div className="relative">
            <input
                value={value}
                onChange={onChange}
                id={'form-input-' + label?.toLowerCase()?.replaceAll(' ', '-')}
                {...props}
                type={visible ? 'text' : 'password'}
                className="peer placeholder-transparent h-10 pr-4 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder={label}/>
            <label
                htmlFor={'form-input-' + label?.toLowerCase()?.replaceAll(' ', '-')}
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                {label}
            </label>
            <div
                style={{
                    position: "absolute",
                    right: "4px",
                    bottom: "8px",
                    color: "#6c757d"
                }}
                role="button"
                onClick={() => setVisible(!visible)}>
                {visible ? <BiLockOpenAlt size={18}/> : <BiLockAlt size={18}/>}

            </div>
        </div>
    )
}