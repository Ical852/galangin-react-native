import { LogBox, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'
import FlashMessage from 'react-native-flash-message'
LogBox.ignoreAllLogs()
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
      <FlashMessage />
    </>
  )
}

export default App

const styles = StyleSheet.create({})