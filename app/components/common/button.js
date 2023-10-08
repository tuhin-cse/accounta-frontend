const Button = ({children, ...props}) => {
    return (
        <button
            {...props}
            className={'bg-indigo-500 text-white rounded px-3 py-1.5 ' + (props?.className || '')}>
            {children}
        </button>
    )
}

export default Button;