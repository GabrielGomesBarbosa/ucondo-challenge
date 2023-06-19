import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Option from '../../types/Option'

type PickerComponentProps = {
  selectedValue: string
  setValue: (itemValue: string) => void
  options: Option[]
  enabled?: boolean
}

const PickerComponent = ({ selectedValue, setValue, options, enabled = true }: PickerComponentProps) => {

  return <View style={styles.container}>
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue: string, _) => setValue(itemValue)}
      style={styles.picker}
      enabled={enabled}
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