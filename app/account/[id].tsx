import * as React from 'react'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Stack, useSearchParams, useRouter } from 'expo-router'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'

import { BodyCard } from '../../src/components'

export default function AccountDetail() {

  const router = useRouter()
  const params = useSearchParams<{ id: string | null }>()

  const [id, setId] = React.useState<string | null>(null)

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
          headerRight: () => <Feather name='check' size={30} color='#fff'/>,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#622490'
          },
          title: null
        }}
      />
      
      <BodyCard>
        <Text>Form here...</Text>
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
