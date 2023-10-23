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
            label={label}
            rules={[...initRules, ...rules]}
            className="mb-4"
            initialValue={initialValue || ''}
        >
            <input className="form-input"/>
        </Form.Item>
    )
}

export default FormInput;