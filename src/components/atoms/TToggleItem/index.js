import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const TToggleItem = ({ name, active, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
      <Text style={styles.name(active)}>{name}</Text>
      <View style={styles.indicator(active)}/>
    </TouchableOpacity>
  )
}

export default TToggleItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    indicator: (active) => ({
        height: 3,
        width: 40,
        backgroundColor: active ? customColors.primary : customColors.white,
        marginTop: 13
    }),
    name: (active) => ({
        fontSize: 14,
        fontFamily: active ? customFonts.semiBold : customFonts.regular,
        color: active ? customColors.primary : customColors.text.secondary 
    })
})