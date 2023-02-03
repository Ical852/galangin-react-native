import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const DSumItem = ({ keyval, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.key}>{keyval}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

export default DSumItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    key: {
        fontSize: 14,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary
    },
    value: {
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    }
})