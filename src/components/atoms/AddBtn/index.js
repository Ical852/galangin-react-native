import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const AddBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AddBtn

const styles = StyleSheet.create({
    container: {
        height: 32,
        width: 113,
        backgroundColor: customColors.primary,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 50,
        elevation: 2,
        marginTop: 14,
        marginLeft: 16
    },
    text:{ 
        fontSize: 10,
        fontFamily: customFonts.medium,
        color: customColors.white
    }
})