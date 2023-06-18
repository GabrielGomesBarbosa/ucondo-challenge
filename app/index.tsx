import * as React from 'react'
import { Stack } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import { SearchInput } from '../src/components'

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerLeft: () => <Text style={{ color: '#fff', fontSize: 20 }}>Plano de Contas</Text>,
          headerRight: () => <Ionicons name='add' size={30} color='#fff'/>,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#622490'
          },
          title: null
        }}
      />
      <SearchInput />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#622490',
    padding: 20
  }
})
