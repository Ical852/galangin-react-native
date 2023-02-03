import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts, showError, showSuccess, linkApi } from '../../utils'
import { AuthHeader, CustomButton, CustomInput, Gap, TextPress } from '../../components'
import { IlSignUp } from '../../assets'
import { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [nameError, setNameError] = useState([])
    const [emailError, setEmailError] = useState([])
    const [passwordError, setPasswordError] = useState([])

    const onSignUp = async () => {
        setNameError([])
        setEmailError([])
        setPasswordError([])
        await axios({
        url: `${linkApi}/signup`,
        method: 'POST',
        data: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password,
            phone_number: 'New User',
            image: 'assets/user/dummyusernull.png',
            role: 'New User',
            level: 'New User'
        }
        }).then(async(result) => {
            const token = result.data.data.access_token
            global.user = result.data.data.user
            global.token = `Bearer ${token}`
            showSuccess('Sign Up Success')
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
        const nameErr = errors.name
        const passErr = errors.password
        const emErr = errors.email
        if (typeof errors !== 'object') {
            return showError(errors.toString())
        }
        if (nameErr) {
            setNameError(nameErr)
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <AuthHeader
                    title={"Sign Up"}
                    subTitle={"Sign up to access the apps"}
                />
                <View style={styles.il}>
                    <IlSignUp/>
                </View>
                <CustomInput
                    title={"Full Name"}
                    placeholder={"Masukkan Full Name"}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    error={nameError.length > 0}
                    errors={nameError}
                />
                <Gap height={20}/>
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
                    title={"Password"}
                    placeholder={"Masukkan Password"}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    error={passwordError.length > 0}
                    errors={passwordError}
                    secure
                />
                <Gap height={18}/>
                <Text style={styles.textOri}>
                    By signing up, you're agree to our
                    <Text style={styles.textOn}> Term & Conditions </Text>
                    <Text> and </Text>
                    <Text style={styles.textOn}>Privacy Policy</Text>
                </Text>
                <Gap height={32}/>
                <CustomButton
                    title={"Sign Up"}
                    onPress={() => onSignUp()}
                />
                <Gap height={24}/>
                <View style={styles.bottom}>
                    <TextPress
                        text={"Already have an account? "}
                        press={"Sign In!"}
                        onPress={() => navigation.replace('SignIn')}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white,
        paddingHorizontal: 32,
        paddingTop: 21
    },
    il: {
        alignItems: 'center',
        marginVertical: 30
    },
    textOri: {
        fontSize: 11,
        fontFamily: customFonts.regular,
        color: customColors.text.primary,
    },
    textOn : {
        fontSize: 11,
        fontFamily: customFonts.semiBold,
        color: customColors.primary,
    },
    bottom: {
        marginBottom : 22,
        alignItems: 'center'
    }
})