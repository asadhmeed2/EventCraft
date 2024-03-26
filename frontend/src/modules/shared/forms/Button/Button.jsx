import React from 'react'

import {Spinner} from '../../components/Spinner/Spinner'

export const Button = ({children,loading,label,color,...rest}) => {
  return (
    <button {...rest} disabled={loading} className={`bg-transparent hover:bg-secondary-100 hover:font-black hover:border hover:border-secondary-900 text-${color}-900 font-semibold py-2 px-4 rounded`}>
        {!loading && children}
        {loading && <Spinner/>}
    </button>
  )
}
