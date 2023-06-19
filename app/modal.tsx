import * as React from 'react'
import { Stack, useRouter } from 'expo-router'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native'

import AccountItem from '../src/types/AccountItem'
import { getAllParent } from '../src/services/entities/Account'
import { SearchInput, BodyCard, AccountList } from '../src/components'

export default function ModalSearch() {

  const router = useRouter()

  const [list, setList] = React.useState<AccountItem[]>([])
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [filteredList, setFilteredList] = React.useState<AccountItem[]>([])

  const getList = async () => {
    const resultList = await getAllParent()
    setList(resultList)
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
    getList()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
     
      <Stack.Screen 
        options={{
          headerLeft: () =>  <Text style={{ color: '#fff', fontSize: 20 }}>Buscar conta pai</Text>,
          headerRight: () => <TouchableOpacity onPress={() => router.back()}><MaterialIcons name='close' color='#fff' size={20} style={{ marginEnd: 10 }}/></TouchableOpacity>,
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
        placeholder='Pesquisar conta pai' 
      />
      
      <BodyCard>
        {
          <AccountList title='Contas pais' list={filteredList} allowDelete={false} />
        }
        <View style={{ position: 'absolute', bottom: 0 }}>
          <Text>Limpar Selecionado e Voltar</Text>
          <TouchableOpacity>
            <Feather name='trash' size={20} color='#FF6680' />
          </TouchableOpacity>

        </View>
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
