import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const TextPress = ({ text, press, onPress }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            <Text style={styles.press}>{press}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default TextPress

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 14,
        color: customColors.text.primary,
        fontFamily: customFonts.regular
    },
    press: {
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.primary
    }
})