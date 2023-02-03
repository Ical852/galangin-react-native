import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import { IcCrossPurp, IcInfo } from '../../../assets'

const Info = ({ title, desc, onPress }) => {
  return (
    <View style={styles.container}>
        <IcInfo/>
        <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.xbtn}>
            <IcCrossPurp/>
        </TouchableOpacity>
    </View>
  )
}

export default Info

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        height: 100,
        backgroundColor: customColors.secondary,
        borderWidth: 1,
        borderColor: customColors.primary,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14
    },
    info: {
        marginLeft: 16,
        marginRight: 16
    },
    title: {
        fontSize: 12,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    desc: {
        fontSize: 10,
        fontFamily: customFonts.light,
        color: customColors.text.primary,
        marginTop: 4
    },
    xbtn: {
        position: 'absolute',
        top: 11,
        right: 12
    }
})