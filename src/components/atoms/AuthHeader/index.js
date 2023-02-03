import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const AuthHeader = ({ title, subTitle }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  )
}

export default AuthHeader

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    subTitle: {
        fontSize: 14,
        fontFamily: customFonts.light,
        customColors: customColors.text.secondary
    }
})