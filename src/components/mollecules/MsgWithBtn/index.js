import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Gap, MiniButton } from '../../atoms'
import { customColors, customFonts } from '../../../utils'

const MsgWithBtn = ({ titleMsg, message, onPress, titleBtn }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{titleMsg}</Text>
        <Text style={styles.message}>
            {message}
        </Text>
        <Gap height={30}/>
        <MiniButton
            title={titleBtn}
            onPress={onPress}
        />
    </View>
  )
}

export default MsgWithBtn

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    message: {
        width: 227,
        textAlign: 'center',
        fontFamily: customFonts.light,
        marginTop: 6,
        color: customColors.text.secondary
    }
})