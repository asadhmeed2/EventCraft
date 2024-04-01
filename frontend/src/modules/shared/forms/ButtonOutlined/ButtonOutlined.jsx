import React from 'react'

import {Spinner} from '../../components/Spinner/Spinner'

export const ButtonOutlined = ({children,loading,label,color,className,...rest}) => {
  return (
    <button {...rest} disabled={loading} className={`bg-transparent hover:bg-secondary-100 hover:font-black hover:border hover:border-secondary-900 text-${color}-900 font-semibold py-2 px-4 rounded ${className}`}>
        {!loading && children}
        {loading && <Spinner/>}
    </button>
  )
}
