import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import { IcMidtrans } from '../../../assets'

const PaymentMehod = () => {
  return (
    <View style={styles.container}>
        <View style={styles.line}/>
        <View style={styles.content}>
            <Text style={styles.title}>Payment Method</Text>
            <View style={styles.methodbox}>
                <IcMidtrans/>
                <Text style={styles.midtranstext}>Midrans Payment</Text>
            </View>
        </View>    
    </View>
  )
}

export default PaymentMehod

const styles = StyleSheet.create({
    container: {
        backgroundColor: customColors.white,
        elevation: 3,
        height: 132,
    },
    line: {
        height: 1,
        backgroundColor: customColors.def.greyL,
    },
    content: {
        paddingVertical: 20,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 16,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    methodbox: {
        height: 48,
        borderWidth: 1,
        borderColor: customColors.text.secondary,
        borderRadius: 8,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    midtranstext: {
        fontSize: 14,
        fontFamily: customFonts.regular,
        color: customColors.text.primary,
        marginLeft: 12
    }
})