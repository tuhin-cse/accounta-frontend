import {Form, Select} from "antd";

const FormSelect = ({label, name, required, initialValue, rules = [], options}) => {
    let initRules = [
        {
            required: required,
            message: `Please provide ${typeof label === 'string' && label?.toLowerCase() || 'a value'}`
        },
    ]

    return (
        <Form.Item
            name={name}
            label={label}
            rules={[...initRules, ...rules]}
            className="mb-4"
            initialValue={initialValue || ''}
        >
            <Select bordered={false}>
                {options?.map((option, index) => (
                    <Select.Option
                        key={index}
                        value={option?.value || option?._id}>
                        {option?.label || option?.name}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default FormSelect;