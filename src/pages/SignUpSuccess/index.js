import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IlSUScs } from '../../assets'
import { customColors, customFonts } from '../../utils'
import { CustomButton, Gap } from '../../components'

const SignUpSuccess = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.il}> 
            <IlSUScs/>
        </View>
        <Text style={styles.title}>Sign up success!, you can start the apps</Text>
        <Text style={styles.subtitle}>
            Your account has been created, now you can continue to fund any peoples campaign or make yourself a campaign for fundraising or something
        </Text>
        <CustomButton
            title={"Continue"}
            onPress={() => navigation.replace('Main')}
        />
        <Gap height={32}/>
    </View>
  )
}

export default SignUpSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        backgroundColor: customColors.white
    },
    il: {
        alignItems: 'center',
        marginBottom: 100
    },
    title: {
        fontSize: 24,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    subtitle: {
        fontSize: 16,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary,
        marginTop: 8,
        marginBottom : 32
    }
})