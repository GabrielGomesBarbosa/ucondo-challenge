import * as React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'

import Picker from '../Picker'

const AccountForm = () => {
  
  const [hasParent, setHasParent] = React.useState<string>('1')
  const [accountType, setAccountType] = React.useState<string>('Receita')
  const [release, setRelease] = React.useState<string>('1')
  
  return <View style={styles.container}>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Tipo de conta:</Text>
      <Picker 
        selectedValue={hasParent}
        setValue={setHasParent}
        options={[
          {
            value: '1',
            label: 'Conta Pai'
          },
          {
            value: '2',
            label: 'Conta Filho'
          }
        ]}
      />
    </View>
    {
      hasParent === '2' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Conta pai:</Text>
          <TouchableOpacity style={styles.dropDownButton}>
            <Text>Xubilubi</Text>
            <MaterialIcons name='arrow-drop-down' color='#747474' size={24}/>
          </TouchableOpacity>
        </View>
      )
    }
    <View style={styles.formGroup}>
      <Text style={styles.label}>Código:</Text>
      <TextInput style={styles.input} />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Tipo:</Text>
      <Picker 
        selectedValue={accountType}
        setValue={setAccountType}
        options={[
          {
            value: 'Receita',
            label: 'Receita'
          },
          {
            value: 'Despesa',
            label: 'Despesa'
          }
        ]}
      />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Aceita lançamentos:</Text>
      <Picker 
        selectedValue={release}
        setValue={setRelease}
        options={[
          {
            value: '1',
            label: 'Sim'
          },
          {
            value: '2',
            label: 'Não'
          }
        ]}
      />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  formGroup: {
    marginBottom: 10
  },
  label: {
    color: '#6A6A6A',
    fontSize: 15,
    marginBottom: 5
  },
  dropDownButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 15
  },
  input: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 15
  }
})

export default AccountForm