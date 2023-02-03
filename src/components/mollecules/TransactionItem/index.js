import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import { IcCrossFailed, IcTrxFailed, IcTrxSuccess } from '../../../assets'
import NumberFormatter from '../Number'

const TransactionItem = ({ title, price, date, status }) => {
  return (
    <View style={styles.container}>
        <View style={styles.main}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>
                <NumberFormatter
                    number={price}
                />
            </Text>
            <View style={styles.status}>
                {
                    status === 'Success' ?
                    <IcTrxSuccess/> : <IcTrxFailed/>
                }
                <Text style={styles.statustext(status)}>{status}</Text>
            </View>
        </View>
        <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default TransactionItem

const styles = StyleSheet.create({
    container: {
        height: 120,
        marginHorizontal: 24,
        backgroundColor: customColors.white,
        elevation: 3,
        borderRadius: 12,
        paddingVertical: 16,
        paddingLeft: 24,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    main: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    price: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        color: customColors.text.primary,
        marginTop: 8
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    statustext: (status) => ({
        fontSize: 14,
        fontFamily: customFonts.medium,
        color: status === 'Success' ? customColors.def.green1 : customColors.def.red,
        marginLeft: 7,
    }),
    date: {
        fontSize: 10,
        fontFamily: customFonts.light,
        color: customColors.text.secondary
    }
})