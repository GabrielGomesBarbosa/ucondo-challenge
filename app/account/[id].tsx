import * as React from 'react'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Stack, useSearchParams, useRouter } from 'expo-router'
import { getStateForKey, useStateX, setStateForKey } from 'react-native-redux'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

import Account from '../../src/types/Account'
import { getCodeString, incrementCode } from '../../src/utils'
import { formErrorHandler } from '../../src/utils/errorHandler'
import { BodyCard, PickerComponent } from '../../src/components'
import { create, getLastChild } from '../../src/services/entities/AccountEntity'


type FormErrorMessage = {
  field: string
  message: string | null
}

export default function AccountDetail() {

  const router = useRouter()
  const params = useSearchParams<{ id: string | null }>()
  const parentAccount = useStateX('parentAccount')

  const [code, setCode] = React.useState<string>('')
  const [name, setName] = React.useState<string>('')
  const [id, setId] = React.useState<string | null>(null)
  const [release, setRelease] = React.useState<string>('0')
  const [accountType, setAccountType] = React.useState<string>('Receita')
  const [errorMessages, setErrorMessages] = React.useState<FormErrorMessage[]>([])

  const save = async (account: Account) => {
    try {
      if(!account.id) {
        const accountId = await create({
          type: account.type,
          parentId: account.parentId,
          codeUser: account.codeUser,
          codeString: account.codeString,
          name: account.name,
          release: account.release
        })

        console.log('accountId', accountId)
      }

      router.back()
    } catch (error) {
      const errorObject = formErrorHandler(error.message)

      console.log('error', errorObject)

      if (errorObject.field === 'code') {
        setErrorMessages([...errorMessages, { field: errorObject.field, message: errorObject.message }])
      }
    }
  }

  const handleSelectParentAccount = () => {
    setStateForKey('accountType', accountType)
    router.push('modal')
  }

  const submitData = async () => {  
    const parentAccount = getStateForKey('parentAccount')

    const accountData: Account = {
      type: accountType,
      parentId: parentAccount ? parentAccount.id : null, 
      codeUser: code,
      codeString: getCodeString(code),
      name,
      release: parentAccount === '0' ? '2' : release 
    }

    await save(accountData)
  }

  const generateCode = async () => {
    const lastChild = await getLastChild(parentAccount.id)
    console.log('lastChild', lastChild)
    const code = incrementCode(parentAccount.code, lastChild)
    setCode(code) 
  }

  React.useEffect(() => {
    if (parentAccount) {
      generateCode()
    }
  }, [parentAccount])

  React.useEffect(() => {
    if (params && params.id !== null) {
      setId(params.id)
    }
  }, [params])

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerLeft: () => <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name='arrow-back-ios' color='#fff' size={20} style={{ marginEnd: 10 }}/>
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 20 }}>{id !== 'null' ? 'Editar' : 'Inserir'} Conta</Text>
          </View>,
          headerRight: () => <TouchableOpacity onPress={() => submitData()}><Feather name='check' size={30} color='#fff'/></TouchableOpacity>,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#622490'
          },
          title: null
        }}
      />
      
      <BodyCard>
        <View style={styles.containerForm}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo:</Text>
            <PickerComponent 
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
            <Text style={styles.label}>Conta pai:</Text>
            <TouchableOpacity 
              onPress={() => handleSelectParentAccount()} 
              style={styles.dropDownButton}
            >
              <Text>{parentAccount ? `${parentAccount.code} - ${parentAccount.value}` : 'Nenhuma conta selecionada'}</Text>
              <MaterialIcons name='arrow-drop-down' color='#747474' size={24}/>
            </TouchableOpacity>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Código:</Text>
            <TextInput 
              value={code}
              onChangeText={(text) => setCode(text)}
              style={[styles.input, errorMessages.find(item => item.field === 'code') && styles.error]} 
            />
            <Text 
              style={[styles.errorMessage, { display: errorMessages.find(item => item.field === 'code') ? 'flex' : 'none' }]}>
              {errorMessages.find(item => item.field === 'code')?.message}
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput 
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input} 
            />
          </View>
          {
            parentAccount && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Aceita lançamentos:</Text>
                <PickerComponent 
                  selectedValue={release}
                  setValue={setRelease}
                  options={[
                    {
                      value: '0',
                      label: 'Não'
                    },
                    {
                      value: '1',
                      label: 'Sim'
                    }
                  ]}
                />
              </View>
            )
          }
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
  },
  containerForm: {
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
  },
  error: {
    borderWidth: 1,
    borderColor: 'red'
  },
  errorMessage: {
    color: '#FF6680',
    fontSize: 13
  }
})
