import * as React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return <Stack>
    <Stack.Screen name='modal' options={{ presentation: 'modal' }}  />
  </Stack>
}

export default Layout