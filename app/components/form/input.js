import {Form} from 'antd';

const FormInput = ({label, name, required, isEmail, initialValue, rules = [], textArea}) => {
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
            {textArea ? <textarea className="form-input"/> : <input className="form-input"/>}
        </Form.Item>
    )
}

export default FormInput;


export const HiddenInput = ({name, initialValue,}) => {
    return (
        <Form.Item
            name={name}
            initialValue={initialValue || ''}
            hidden
        >
            <input className="form-input"/>
        </Form.Item>
    )
}