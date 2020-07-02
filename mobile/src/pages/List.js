import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { AsyncStorage, ScrollView, Image, SafeAreaView, Alert, StyleSheet } from 'react-native'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List() {
  const [ techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.9.31:3333', {
        query: { user_id }
      })  

      console.log("Alo")

      socket.on('booking_response', booking => {
        console.log(booking)
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? "APROVADA" : "REJEITADA"}`)
      })
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => {
        return tech.trim()
      })
      setTechs(techsArray)
    })
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30
  }
})