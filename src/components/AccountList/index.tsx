import * as React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'

import AccountItem from '../../types/AccountItem'

type AccountItemProps = {
  item: AccountItem
  allowDelete: boolean
}

const Item = ({ item, allowDelete }: AccountItemProps) => {
  return <View style={styles.itemContainer}>
    <TouchableOpacity style={styles.itemText}>
      <Text style={{ color: item.type === 'Receita' ? '#1BA803' : '#E28856' }}>{item.codeUser} - {item.name}</Text>
    </TouchableOpacity>
    {
      allowDelete && (
        <TouchableOpacity style={styles.itemButton}>
          <Feather name='trash' size={20} color='#C4C4D1' />
        </TouchableOpacity>
      )
    }
  </View>
}

type AccountListProps = {
  title: string
  list: AccountItem[]
  allowDelete?: boolean
}

const AccountList = ({ title, list, allowDelete = true }: AccountListProps) => {

  return <>
    <View style={styles.containerTitle}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.titleCount}>{list.length} Registro(s)</Text>
    </View>
    
    <FlatList
      data={list}
      renderItem={({ item }) => <Item key={item.id} item={item} allowDelete={allowDelete} />}
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