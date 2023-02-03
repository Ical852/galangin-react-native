import { StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { customColors, customFonts, linkApi, showError } from '../../utils'
import { IlLogo } from '../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Splash = ({navigation}) => {
  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    await AsyncStorage.getItem('user_token').then(res => {
      setTimeout(async () => {
        if (res != null) {
          return await axios.get(`${linkApi}/user`, {
            headers: {
              'Authorization': JSON.parse(res),
              'Content-Type' : 'application/json',
              'Accept' : 'application/json'
            }
          })
          .then(res => {
            global.user = res.data.data
            navigation.replace('Main')
          })
          .catch(err => {
            showError('Something went wrong')
            console.log(err.response.data)
          })
        }
        navigation.replace('SignIn')
      }, 2000);
    })
  }

  return (
    <LinearGradient
    colors={[customColors.gradient.sec, customColors.gradient.main]}
    style={styles.container}>
      <IlLogo/>
      <Text style={styles.title}>Galangin</Text>
    </LinearGradient>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontFamily: customFonts.semiBold,
    color: customColors.white,
    marginTop: 30
  }
})