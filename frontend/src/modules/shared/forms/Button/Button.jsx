import React from 'react'

import {Spinner} from '../../components/Spinner/Spinner'

export const Button = ({children,loading,label,color,...rest}) => {
  return (
    <button {...rest} disabled={loading} className={`bg-secondary-900 hover:bg-secondary-800 hover:font-black text-white font-semibold py-2 px-4 rounded`}>
        {!loading && children}
        {loading && <Spinner/>}
    </button>
  )
}
