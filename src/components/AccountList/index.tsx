import * as React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'

import { accountList } from '../../constants'
import AccountItem from '../../types/AccountItem'

type AccountItemProps = {
  item: AccountItem
}

const Item = ({ item }: AccountItemProps) => {
  return <View style={styles.itemContainer}>
    <TouchableOpacity style={styles.itemText}>
      <Text style={{ color: item.type === 'credit' ? '#1BA803' : '#E28856' }}>{item.name}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.itemButton}>
      <Feather name='trash' size={20} color='#C4C4D1' />
    </TouchableOpacity>
  </View>
}


const AccountList = () => {
  return <View style={styles.container}>
    <View style={styles.containerTitle}>
      <Text style={styles.title}>Listagem</Text>
      <Text style={styles.titleCount}>27 Registros</Text>
    </View>
    <FlatList
      data={accountList}
      renderItem={({ item }) => <Item key={item.id} item={item} />}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EDF5',
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  containerTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 24
  },
  titleCount: {
    color: '#A0A0B2'
  },
  list: {
    marginTop: 10
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