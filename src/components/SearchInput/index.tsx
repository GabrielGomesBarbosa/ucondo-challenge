import * as React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { StyleSheet, View, TextInput } from 'react-native'

const SearchInput = () => {
  return <View style={styles.inputContainer}>
    <Feather name='search' style={styles.icon} />
    <TextInput placeholder='Pesquisar conta' style={styles.input} />
  </View>
}

const styles = StyleSheet.create({
  inputContainer: {

    marginVertical: 20,
    marginHorizontal: 20 
  },
  input: {
    backgroundColor: '#fff', 
    borderRadius: 50, 
    height: 50,
    paddingStart: 50,
    paddingEnd: 10
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: 10,
    fontSize: 30,
    zIndex: 100,
    color: '#C4C4D1'
  }
})

export default SearchInput