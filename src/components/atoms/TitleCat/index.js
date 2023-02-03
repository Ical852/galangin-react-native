import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const TitleCat = ({ mainText, subText, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.maintext}>{mainText}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.subtext}>{subText}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TitleCat

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    maintext: {
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    subtext: {
        fontSize: 10,
        fontFamily: customFonts.medium,
        color: customColors.primary
    }
})