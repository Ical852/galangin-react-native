import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import { Gap } from '../../atoms'

const ProfileDataItem = ({ title, value }) => {
  return (
    <>
        <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
        </View>
        <View style={styles.line}/>
        <Gap height={12}/>
    </>
  )
}

export default ProfileDataItem

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24
    },
    title:{ 
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.primary
    },
    value: {
        fontSize: 14,
        fontFamily: customFonts.regular,
        color: customColors.text.primary
    },
    line: {
        height: 1,
        backgroundColor: customColors.def.greyL,
        marginTop: 12
    }
})