const Button = ({children, ...props}) => {
    return (
        <button
            {...props}
            className={'bg-indigo-500 text-white rounded px-4 py-2 text-sm font-medium ' + (props?.className || '')}>
            {children}
        </button>
    )
}

export default Button;