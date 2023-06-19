import * as React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Stack, useRouter, useNavigation } from 'expo-router'
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native'

import AccountItem from '../src/types/AccountItem'
import { getAll } from '../src/services/entities/Account'
import { SearchInput, AccountList, BodyCard } from '../src/components'

export default function AccountPage() {

  const router = useRouter()
  const navigation = useNavigation()

  const [accountList, setAccountList] = React.useState<AccountItem[]>([])

  const getAccountList = async () => {
    setAccountList(await getAll())
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      getAccountList()
    })
  
    return () => unsubscribe()
  }, [navigation])

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
      
      <SearchInput placeholder='Pesquisar conta' />

      <BodyCard>
        <AccountList title='Listagem' list={accountList} />
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
