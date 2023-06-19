import * as React from 'react'
import { Stack, useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native'

import { SearchInput, AccountList, BodyCard } from '../src/components'

export default function Account() {

  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerLeft: () => <Text style={{ color: '#fff', fontSize: 20 }}>Plano de Contas</Text>,
          headerRight: () => <TouchableOpacity onPress={() => router.push('account/null')}><Ionicons name='add' size={30} color='#fff'/></TouchableOpacity>,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#622490'
          },
          title: null
        }}
      />
      
      <SearchInput />

      <BodyCard>
        <AccountList />
      </BodyCard>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#622490'
  }
})
