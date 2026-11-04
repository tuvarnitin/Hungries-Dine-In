import React, { ReactNode } from 'react'
import ReduxProvider from './ReduxProvider'
import QueryProvider from './QueryProvider'
import { SessionProvider } from 'next-auth/react'

const RootProvider = ({children}:{children:ReactNode}) => {
  return (
    <SessionProvider>
      <ReduxProvider>
          <QueryProvider>
              {children}
          </QueryProvider>
      </ReduxProvider>
    </SessionProvider>
  )
}

export default RootProvider