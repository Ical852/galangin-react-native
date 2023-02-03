import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { customColors, customFonts } from '../../../utils'

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <LinearGradient
        colors={[customColors.gradient.sec, customColors.gradient.main]}
        style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        color: customColors.white
    }
})