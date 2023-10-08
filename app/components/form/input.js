import {Form} from 'antd';

const FormInput = ({label, name, required, isEmail, initialValue, rules = [], ...props}) => {
    let initRules = [
        {
            required: required,
            message: `Please provide ${typeof label === 'string' && label?.toLowerCase() || 'a value'}`
        },
    ]
    if (isEmail) {
        initRules.push({type: 'email', message: 'Please enter a valid email address'})
    }

    return (
        <Form.Item
            name={name}
            rules={[...initRules, ...rules]}
            className="mb-8"
            initialValue={initialValue || ''}
        >
            <Input label={label} {...props} />
        </Form.Item>
    )
}

export default FormInput;

const Input = ({value, onChange, label, ...props}) => {
    return (
        <div className="relative">
            <input
                value={value}
                onChange={onChange}
                id={'form-input-' + label?.toLowerCase()?.replaceAll(' ', '-')}
                {...props}
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder={label}/>
            <label
                htmlFor={'form-input-' + label?.toLowerCase()?.replaceAll(' ', '-')}
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                {label}
            </label>
        </div>
    )
}