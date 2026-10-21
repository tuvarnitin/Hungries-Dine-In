import React, { ReactNode } from 'react'
import ReduxProvider from './ReduxProvider'
import QueryProvider from './QueryProvider'

const RootProvider = ({children}:{children:ReactNode}) => {
  return (
    <ReduxProvider>
        <QueryProvider>
            {children}
        </QueryProvider>
    </ReduxProvider>
  )
}

export default RootProvider