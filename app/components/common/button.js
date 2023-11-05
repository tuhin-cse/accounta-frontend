const Button = ({children, className, ...props}) => {
    return (
        <button
            {...props}
            className={'bg-indigo-500 text-white rounded px-4 py-2 text-sm font-medium ' + (className || '')}>
            {children}
        </button>
    )
}

export default Button;