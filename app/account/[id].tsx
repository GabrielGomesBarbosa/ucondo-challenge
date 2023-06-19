import * as React from 'react'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { getStateForKey, useStateX } from 'react-native-redux'
import { Stack, useSearchParams, useRouter } from 'expo-router'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

import Account from '../../src/types/Account'
import { getCodeString, incrementCode } from '../../src/utils'
import { BodyCard, PickerComponent } from '../../src/components'
import { create, getChildren } from '../../src/services/entities/Account'

export default function AccountDetail() {

  const router = useRouter()
  const params = useSearchParams<{ id: string | null }>()
  const parentAccount = useStateX('parentAccount')

  const [code, setCode] = React.useState<string>('')
  const [name, setName] = React.useState<string>('')
  const [id, setId] = React.useState<string | null>(null)
  const [release, setRelease] = React.useState<string>('1')
  const [hasParent, setHasParent] = React.useState<string>('0')
  const [accountType, setAccountType] = React.useState<string>('Receita')

  const save = async (account: Account) => {
    try {
      if(!account.id) {
        const accountId = await create({
          type: account.type,
          hasParent: account.hasParent,
          parentId: account.parentId,
          codeUser: account.codeUser,
          codeString: account.codeString,
          name: account.name,
          release: account.release
        })

        console.log('accountId', accountId)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSelectParentAccount = () => {
    router.push('modal')
  }

  const submitData = async () => {  
    const parentAccount = getStateForKey('parentAccount')

    const accountData: Account = {
      type: accountType,
      hasParent,
      parentId: hasParent === '1' ? parentAccount.id : null, 
      codeUser: code,
      codeString: getCodeString(code),
      name,
      release: hasParent === '0' ? '2' : release 
    }

    await save(accountData)
    router.back()
  }

  const generateCode = async () => {
    console.log('selected', parentAccount)
    const childrenList = await getChildren(parentAccount.id)
    console.log('chidlrenList', childrenList)
    const code = incrementCode(parentAccount.code)
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
            <Text style={styles.label}>Conta pai ou filho:</Text>
            <PickerComponent 
              selectedValue={hasParent}
              setValue={setHasParent}
              options={[
                {
                  value: '0',
                  label: 'Conta Pai'
                },
                {
                  value: '1',
                  label: 'Conta Filho'
                }
              ]}
            />
          </View>
          {
            hasParent === '1' && (
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
            )
          }
          <View style={styles.formGroup}>
            <Text style={styles.label}>Código:</Text>
            <TextInput 
              value={code}
              onChangeText={(text) => setCode(text)}
              style={styles.input} />
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
            hasParent === '1' && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Aceita lançamentos:</Text>
                <PickerComponent 
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
  }
})
