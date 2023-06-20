import * as React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { setStateForKey  } from 'react-native-redux'
import { Stack, useRouter, useNavigation } from 'expo-router'
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native'

import AccountItem from '../src/types/AccountItem'
import { getAll, remove } from '../src/entities/Account'
import { SearchInput, AccountList, BodyCard, DeleteModal } from '../src/components'

export default function AccountPage() {

  const router = useRouter()
  const navigation = useNavigation()

  const [list, setList] = React.useState<AccountItem[]>([])
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [filteredList, setFilteredList] = React.useState<AccountItem[]>([])
  const [modalDelete, setModalDelete] = React.useState<{ 
    open: boolean,
    itemId: number,
    itemText: string | null 
  }>({
    open: false,
    itemId: null,
    itemText: null
  })

  const getAccountList = async () => {
    const list = await getAll()
    setList(list)
  }

  const handleNewAccount = () => {
    setStateForKey('parentAccount', null)
    router.push('account/null')
  }

  const handleRemove = async ({ id, code, label }) => {
    setModalDelete({
      open: true,
      itemId: id,
      itemText: `${code} - ${label}`
    })
  }

  const deleteItem = async () => {
    try {
      await remove(modalDelete.itemId)
      await getAccountList()
      setModalDelete({
        open: false,
        itemId: null,
        itemText: null
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleCloseModal = () => {
    setModalDelete({
      open: false,
      itemId: null,
      itemText: null
    })
  }

  const handleEdit = async ({ id }) => {
    setStateForKey('parentAccount', null)
    router.push(`account/${id}`)
  }

  const filterList = (text: string) => {
    if (text !== '') {
      const results = list.filter(item => item.codeUser.toLowerCase().indexOf(text.toLowerCase()) !== -1 
        || item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1)
      setFilteredList(results)
    } else {
      setFilteredList(list)
    }

    setSearchTerm(text)
  }

  React.useEffect(() => {
    filterList('')
  }, [list])

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
          headerRight: () => <TouchableOpacity onPress={() => handleNewAccount()}><Ionicons name='add' size={30} color='#fff'/></TouchableOpacity>,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#622490'
          },
          title: null
        }}
      />
      
      <SearchInput 
        searchTerm={searchTerm}
        setSearchTerm={filterList}
        placeholder='Pesquisar conta' 
      />

      <BodyCard>
        <AccountList 
          title='Listagem' 
          list={filteredList} 
          showRelease
          deleteItem={(value) => handleRemove({ id: value.id, code: value.code, label: value.label })}
          getSelectItem={(value) => handleEdit({ id: value.id })}
        />
      </BodyCard>

      <DeleteModal 
        visible={modalDelete.open}
        setVisible={handleCloseModal}
        itemText={modalDelete.itemText}
        confirmEvent={deleteItem}
      />
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
