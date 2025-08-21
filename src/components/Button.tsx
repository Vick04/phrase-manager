import React from 'react'

const Button = (
    props: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
) => {
    return (
        <button
            {...props}
            className={`rounded-full bg-blue-500 px-5 py-2 text-sm leading-5 font-semibold disabled:bg-gray-300 disabled:text-gray-500 text-white hover:bg-blue-700 ${props.className}`}
        />
    )
}

export default Button
