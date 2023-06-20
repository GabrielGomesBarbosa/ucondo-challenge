import * as React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type DeleteModalProps = {
  visible: boolean
  itemText: string
  setVisible: () => void
  confirmEvent: () => void
}

const DeleteModal = ({ visible, itemText, setVisible, confirmEvent }: DeleteModalProps) => {

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Feather name='trash' size={60} color='#FF6680' />
          <View style={styles.textContainer}>
            <Text>Deseja excluir a conta</Text>
            <View style={styles.textValueContainer}>
              <Text style={styles.textValue}>{itemText}</Text>
              <Text>?</Text>
            </View>
            <Text style={styles.textWarning}>Atenção! Ao remover uma conta pai, todas a filhas serão removidas também.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => setVisible()}
              style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>
                Não!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => confirmEvent()}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Com certeza</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  textValueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textValue: {
    fontWeight: 'bold',
    marginEnd: 2
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  cancelButtonText: {
    color: '#FF6680'
  },
  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF6680',
    borderRadius: 50
  },
  confirmButtonText: {
    color: '#fff'
  },
  textWarning: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10
  }
})

export default DeleteModal