import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Option from '../../types/Option'

type PickerComponentProps = {
  selectedValue: string
  setValue: (itemValue: string) => void
  options: Option[]
}

const PickerComponent = ({ selectedValue, setValue, options }: PickerComponentProps) => {

  return <View style={styles.container}>
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue: string, _) => setValue(itemValue)}
      style={styles.picker}
    >
      {
        options.map((item: Option) => <Picker.Item key={item.value} value={item.value} label={item.label} />)
      }
    </Picker>
  </View>
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 16
  },
  picker: {
    backgroundColor: '#fff'
  }
})

export default PickerComponent