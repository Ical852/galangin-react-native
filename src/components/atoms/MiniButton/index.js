import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import LinearGradient from 'react-native-linear-gradient'

const MiniButton = ({ onPress, title }) => {
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

export default MiniButton

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 8,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        color: customColors.white
    }
})