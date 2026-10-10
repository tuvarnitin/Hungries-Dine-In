import { persistor, store } from '@/store/store'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const ReduxProvider = ({children}:{children:ReactNode}) => {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
  )
}

export default ReduxProvider