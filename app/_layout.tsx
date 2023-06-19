import * as React from 'react'
import { Stack } from 'expo-router'
import { Text } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { Provider } from 'react-native-redux'

import GlobalState from '../src/types/GlobalState'

const INITIAL_STATE: GlobalState = {
  parentAccount: null,
  accountType: null,
  loading: false
}

const Layout = () => {

  // React.useEffect(() => {
  //   const db = SQLite.openDatabase('ucondo.db')
  //   db.closeAsync()
  //   db.deleteAsync()
  // }, [])

  return <Provider initialState={INITIAL_STATE} loading={<Text>Carregando</Text>}>
    <Stack>
      <Stack.Screen name='modal' options={{ presentation: 'modal' }}  />
    </Stack>
  </Provider>
}

export default Layout