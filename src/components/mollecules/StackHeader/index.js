import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import { IcBack } from '../../../assets'

const StackHeader = ({ title, onPress }) => {
  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} activeOpacity={0.5} onPress={onPress}>
                <IcBack/>
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.cont}/>
        </View>
        <View style={styles.line}/>
    </View>
  )
}

export default StackHeader

const styles = StyleSheet.create({
    main: {
        backgroundColor: customColors.white
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 24,
        marginTop: 25,
    },
    btn: {
        width: 26,
        height: 26,
        backgroundColor: customColors.white,
        elevation: 3,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cont: {
        width: 26,
        height: 26,
    },
    text:{ 
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    line: {
        height: 1,
        backgroundColor: customColors.def.greyL,
        marginTop: 25
    }
})