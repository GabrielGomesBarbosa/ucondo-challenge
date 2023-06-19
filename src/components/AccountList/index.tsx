import * as React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'

import { accountList } from '../../constants'
import AccountItem from '../../types/AccountItem'
import { getAll } from '../../services/entities/Account'
import Account from '../../types/Account'

type AccountItemProps = {
  item: AccountItem
}

const Item = ({ item }: AccountItemProps) => {
  return <View style={styles.itemContainer}>
    <TouchableOpacity style={styles.itemText}>
      <Text style={{ color: item.type === 'Receita' ? '#1BA803' : '#E28856' }}>{item.name}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.itemButton}>
      <Feather name='trash' size={20} color='#C4C4D1' />
    </TouchableOpacity>
  </View>
}


const AccountList = () => {

  const [accountList, setAccountList] = React.useState<Account[]>([])

  const getList = async () => {
    const resultList = await getAll()
    setAccountList(resultList)
  }

  React.useEffect(() => {
    getList()
  }, [])

  return <>
    <View style={styles.containerTitle}>
      <Text style={styles.title}>Listagem</Text>
      <Text style={styles.titleCount}>27 Registros</Text>
    </View>
    <FlatList
      data={accountList}
      renderItem={({ item }) => <Item key={item.id} item={{ id: item.id!, name: item.name, type: item.type }} />}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
    />
  </>
}

const styles = StyleSheet.create({
  containerTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    fontSize: 24
  },
  titleCount: {
    color: '#A0A0B2'
  },
  list: {
    marginTop: 10,
    paddingHorizontal: 20
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 16
  },
  itemText: {
    flex: 1,
    padding: 12,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16
  },
  itemButton: {
    padding: 12,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16
  }
})

export default AccountList