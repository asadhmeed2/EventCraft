import React, { forwardRef } from 'react'

export const InputOutlined = forwardRef(({type,id,label,error,helperText,className,...inputProps},ref) => {
    return (
        <div>
            <label for={id} class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input ref={ref}  type={type} id={id} className={`bg-transparent border ${error ? 'border-red-500': 'border-gray-400'} text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}  {...inputProps}/>
            {error && <div className='text-red-500'>{helperText}</div>}
        </div>
    )
})
