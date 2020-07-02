import React, { useState } from 'react'
import { AsyncStorage, SafeAreaView, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native'

import api from '../services/api'

export default function Book({ navigation }) {
  const [ date, setDate ] = useState('')
  const id = navigation.getParam('id')

  async function handleSubmit() {
     const user_id = await AsyncStorage.getItem('user')

     await api.post(`/spots/${id}/bookings`, {
      date
     }, {
      headers: { user_id }
     })

     Alert.alert('Solicitação de reserva enviada com sucesso!')

     navigation.navigate('List')
  }

  async function handleCancel() {
    navigation.navigate('List')
  }

  async function handleReturnToLogin() {

    AsyncStorage.removeItem('user')
    navigation.navigate('Login')
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput 
        style={styles.input}
        placeholder="Qual data você quer reserva"
        placeholderTextColor="#999"
        autoCorrect={false}
        autoCapitalize="words"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Encontrar Spots</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReturnToLogin} style={[styles.button, styles.returnLoginButton]}>
        <Text style={styles.buttonText}>Retornar ao Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
  },
  returnLoginButton: {
    marginTop: 10,
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
})