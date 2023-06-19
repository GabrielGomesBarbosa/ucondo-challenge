import * as React from 'react'
import { StyleSheet, View } from 'react-native'

type BodyCardProps = {
  children: React.ReactNode
}

const BodyCard = ({ children }: BodyCardProps) => {
  return <View style={styles.container}>
    {children}
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EDF5',
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  }
})

export default BodyCard