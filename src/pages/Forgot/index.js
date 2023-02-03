import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors } from '../../utils'
import { AuthHeader, CustomButton, CustomInput, Gap, TextPress } from '../../components'
import { IlResPw } from '../../assets'

const Forgot = ({navigation}) => {
  return (
    <View style={styles.container}>
        <AuthHeader
            title={"Reset Password"}
            subTitle={"Send your email to us"}
        />
        <View style={styles.il}>
            <IlResPw/>
        </View>
        <CustomInput
            title={"Email Address"}
            placeholder={"Masukkan Email ADdress"}
            onChangeText={(text) => console.log(text)}
        />
        <Gap height={24}/>
        <CustomButton
            title={"Send Link"}
            onPress={() => navigation.navigate('Sended')}
        />
        <Gap height={24}/>
        <View style={{ alignItems: 'center' }}>
            <TextPress
                text={"Don't have any account yet? "}
                press={"Sign Up!"}
                onPress={() => navigation.navigate('SignUp')}
            />
            <Gap height={8}/>
            <TextPress
                text={"Already have an account? "}
                press={"Sign In!"}
                onPress={() => navigation.navigate('SignIn')}
            />
        </View>
    </View>
  )
}

export default Forgot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white,
        justifyContent: 'center',
        paddingHorizontal: 32
    },
    il: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40
    }
})