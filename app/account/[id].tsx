import * as React from 'react'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Stack, useSearchParams, useRouter } from 'expo-router'
import { getStateForKey, useStateX, setStateForKey } from 'react-native-redux'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

import Account from '../../src/types/Account'
import { formErrorHandler } from '../../src/utils/errorHandler'
import { BodyCard, PickerComponent } from '../../src/components'
import { create, getLastChild, getById } from '../../src/entities/Account'
import { generateCodeString, incrementCode, validateCode } from '../../src/services/account'

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
  const [id, setId] = React.useState<number | null>(null)
  const [release, setRelease] = React.useState<string>('0')
  const [accountType, setAccountType] = React.useState<string>('Receita')
  const [errorMessages, setErrorMessages] = React.useState<FormErrorMessage[]>([])

  const save = async (account: Account) => {
    try {
      if(!account.id) {
        await create({
          type: account.type,
          parentId: account.parentId,
          codeUser: account.codeUser,
          codeString: account.codeString,
          name: account.name,
          release: account.release
        })
      }

      router.back()
    } catch (error) {
      const errorObject = formErrorHandler(error.message)

      if (errorObject.field === 'code') {
        setErrorMessages([{ field: errorObject.field, message: errorObject.message }])
      }
    }
  }

  const handleAccountType = (text: string) => {
    setStateForKey('parentAccount', null)
    setCode(null)
    setAccountType(text)
  }

  const handleSelectParentAccount = () => {
    setStateForKey('accountType', accountType)
    router.push('modal')
  }

  const handleCodeChange = (text: string) => {
    let newValue = ''

    if (text.length > 0) {
      newValue = text.replaceAll(',', '').replaceAll('-', '')
    }

    setCode(newValue)
  }

  const hasErrors = async () => {
    setErrorMessages([])

    const errors = []

    if(!name) {
      errors.push({ field: 'name', message: 'Campo obrigatório' })
    }

    const result = await validateCode(code)

    if(result.error) {
      const { field, message } = result
      errors.push({ field, message })
    }

    const hasErrors = errors.length > 0

    if (hasErrors)
      setErrorMessages(errors)

    return hasErrors
  }

  const submitData = async () => {  
    const parentAccount = getStateForKey('parentAccount')
    
    if(hasErrors())
      return

    const accountData: Account = {
      type: accountType,
      parentId: parentAccount ? parentAccount.id : null, 
      codeUser: code,
      codeString: generateCodeString(code),
      name,
      release: parentAccount === '0' ? '2' : release 
    }

    await save(accountData)
  }

  const generateCode = async () => {
    const lastChild = await getLastChild(parentAccount.id)
    const code = incrementCode(parentAccount.code, lastChild)
    setCode(code) 
  }

  const loadParentAccount = async (parentId: number) => {
    const parentAccount: Account | null = await getById(parentId)
    setStateForKey('parentAccount', {
      id: parentAccount.id,
      code: parentAccount.codeUser,
      label: parentAccount.name
    })
  }

  const loadAccount = async (id: number) => {
    const accountItem: Account | null = await getById(id)

    if(accountItem) {
      const { parentId } = accountItem

      if(parentId)
        loadParentAccount(parentId)

      setId(accountItem.id)
      setAccountType(accountItem.type)
      setCode(accountItem.codeUser)
      setName(accountItem.name)
    }
  }

  React.useEffect(() => {
    if (id === null && parentAccount) {
      generateCode()
    }
  }, [parentAccount])

  React.useEffect(() => {
    if (params && params.id !== null) {
      loadAccount(parseInt(params.id))
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
            <Text style={{ color: '#fff', fontSize: 20 }}>{id !== null ? 'Visualisar' : 'Inserir'} Conta</Text>
          </View>,
          headerRight: () => id === null ? <TouchableOpacity onPress={() => submitData()}><Feather name='check' size={30} color='#fff'/></TouchableOpacity> : null,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#622490'
          },
          title: null
        }}
      />
      <BodyCard>
        <View style={styles.containerForm}>
          {
            id !== null && <View style={styles.warningCard}>
              <Text>
                Não é possivel alterar as informações cadastradas
              </Text>
            </View>
          }
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo:</Text>
            {
              id === null ? <PickerComponent 
                selectedValue={accountType}
                setValue={handleAccountType}
                enabled={!id}
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
              /> : <Text>{accountType}</Text>
            }
            
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Conta pai:</Text>
            {
              id === null ? (<TouchableOpacity 
                onPress={() => handleSelectParentAccount()} 
                style={styles.dropDownButton}
              >
                <Text>{parentAccount ? `${parentAccount.code} - ${parentAccount.label}` : 'Nenhuma conta pai selecionada'}</Text>
                <MaterialIcons name='arrow-drop-down' color='#747474' size={24}/>
              </TouchableOpacity>) : (<Text>{parentAccount ? `${parentAccount.code} - ${parentAccount.label}` : 'Nenhuma conta pai selecionada'}</Text>)
            }
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Código:</Text>
            {
              id === null ? (
                <>
                  <TextInput 
                    value={code}
                    onChangeText={handleCodeChange}
                    keyboardType='numeric'
                    style={[styles.input, errorMessages.find(item => item.field === 'code') && styles.error]} 
                  />
                  <Text 
                    style={[styles.errorMessage, { display: errorMessages.find(item => item.field === 'code') ? 'flex' : 'none' }]}>
                    {errorMessages.find(item => item.field === 'code')?.message}
                  </Text>
                </>
              ) : (
                <Text>{code}</Text>
              )
            }
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome:</Text>
            {
              id === null ? 
                <>
                  <TextInput 
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={[styles.input, errorMessages.find(item => item.field === 'name') && styles.error]} 
                  /> 
                  <Text 
                    style={[styles.errorMessage, { display: errorMessages.find(item => item.field === 'name') ? 'flex' : 'none' }]}>
                    {errorMessages.find(item => item.field === 'name')?.message}
                  </Text>
                </>
                : <Text>{name}</Text>
            }
          </View>
          {
            parentAccount && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Aceita lançamentos:</Text>
                {
                  id === null ? <PickerComponent 
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
                  /> : <Text>{release ? 'Sim' : 'Não'}</Text>
                }
                
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
  warningCard: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 16,
    marginBottom: 10
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
