import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const Toggle = ({ left, right, current, leftPress, rightPress }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.toggle(current === 'left')} onPress={leftPress}>
            <Text style={styles.text(current === 'left')}>{left}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggle(current === 'right')} onPress={rightPress}>
            <Text style={styles.text(current === 'right')}>{right}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Toggle

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        flexDirection: 'row',
        height: 40,
        backgroundColor: customColors.secondary,
        borderRadius: 8,
        padding: 4,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    toggle: (current) => ({
      flex: 1,
      alignItems: 'center',
      backgroundColor: current ? customColors.primary : customColors.secondary,
      height: 32,
      justifyContent: 'center',
      borderRadius: 8
    }),
    text: (current) => ({
        fontSize: 14,
        fontFamily: customFonts.regular,
        color: current ? customColors.white : customColors.text.primary
    })
})