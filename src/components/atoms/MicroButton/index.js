import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const MicroButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.commentBtn} activeOpacity={0.5} onPress={onPress}>
        <Text style={styles.btntext}>{title}</Text>
    </TouchableOpacity>
  )
}

export default MicroButton

const styles = StyleSheet.create({
    commentBtn: {
        height: 24,
        width: 100,
        backgroundColor: customColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    btntext: {
        fontSize: 10,
        fontFamily: customFonts.medium,
        color: customColors.white
    }
})