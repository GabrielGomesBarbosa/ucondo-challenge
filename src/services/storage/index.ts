import AsyncStorage from '@react-native-async-storage/async-storage'

import Account from '../../types/Account'

export const storeData = async (value: Account) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@account', jsonValue)
  } catch (e) {
    console.log('error', e)
  }
}

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@account')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch(e) {
    console.log('error', e)
  }
}