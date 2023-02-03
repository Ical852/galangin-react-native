import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { customColors, customFonts, linkApi, showError, showSuccess } from '../../utils'
import { AuthHeader, CustomButton, CustomInput, Gap, TextPress } from '../../components'
import { IlSignin } from '../../assets'
import { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState([])
  const [passwordError, setPasswordError] = useState([])

  const signInAction = async () => {
    setEmailError([])
    setPasswordError([])
    await axios({
      url: `${linkApi}/signin`,
      method: 'POST',
      data: {
        email: email,
        password: password
      }
    }).then(async(result) => {
      const token = result.data.data.access_token
      global.user = result.data.data.user
      global.token = `Bearer ${token}`
      showSuccess('Sign In Success')
      await AsyncStorage.setItem('user_token', JSON.stringify(`Bearer ${token}`))
      setTimeout(() => {
        navigation.navigate('Main')
      }, 1000);
    }).catch((err) => {
      const errors = err?.response?.data?.meta?.message
      if (errors) {
        return handleErrors(errors)
      }
    });
  }

  const handleErrors = (errors) => {
    const passErr = errors.password
    const emErr = errors.email
    if (typeof errors !== 'object') {
      return showError(errors.toString())
    }
    if (emErr) {
      setEmailError(emErr)
    }
    if (passErr) {
      setPasswordError(passErr)
    }
    showError('Oops Something Wrong')
  }

  return (
    <View style={styles.container}>
      <AuthHeader title={"Sign In"} subTitle={"Sign in and start to fund"}/>
      <View style={styles.ilust}>
        <IlSignin/>
      </View>
      <Gap height={40}/>
      <CustomInput
        title={"Email Address"}
        placeholder={"Masukkan Email Address"}
        onChangeText={(text) => setEmail(text)}
        value={email}
        error={emailError.length > 0}
        errors={emailError}
      />
      <Gap height={20}/>
      <CustomInput
        title={"Passwrod"}
        placeholder={"Masukkan Password"}
        onChangeText={(text) => setPassword(text)}
        value={password}
        error={passwordError.length > 0}
        errors={passwordError}
        secure
      />
      <TouchableOpacity style={styles.onForget} activeOpacity={0.7} onPress={() => navigation.navigate('Forgot')}>
        <Text style={styles.forgtext}>Forgot Password?</Text>
      </TouchableOpacity>
      <Gap height={18} />
      <CustomButton title={"Sign In"} onPress={() => signInAction()}/>
      <Gap height={24}/>
      <View style={{ alignItems: 'center' }}>
        <TextPress
            text={"Don't have any account yet? "}
            press={"Sign Up!"}
            onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        backgroundColor: customColors.white,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32
    },
    ilust: {
        alignItems: 'center',
        marginTop: 30
    },
    onForget: {
        alignItems: 'flex-end'
    },
    forgtext: {
        marginTop: 18,
        fontFamily: customFonts.semiBold,
        color: customColors.primary
    }
})