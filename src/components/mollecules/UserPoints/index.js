import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import NumberFormatter from '../Number'

const UserPoints = ({ donated, bonus }) => {
  return (
    <View style={styles.container}>
        <View style={styles.data1}>
            <Text style={styles.title}>Donated</Text>
            <Text style={styles.price}>
                <NumberFormatter
                    number={donated}
                />
            </Text>
        </View>
        <View style={styles.line}/>
        <View style={styles.data2}>
            <Text style={styles.title}>Bonus Poin</Text>
            <Text style={styles.price}>
                Dp. 
                <NumberFormatter
                    number={bonus}
                    prefix={false}
                />
            </Text>
        </View>
    </View>
  )
}

export default UserPoints

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        height: 70,
        backgroundColor: customColors.white,
        elevation: 3,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    line: {
        height: 46,
        width: 1,
        backgroundColor: customColors.def.grey,
        marginRight: 16
    },
    data1: {
        flex: 1,
    },
    data2: {
        flex: 1,
    },
    title: {
        fontSize: 12,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary
    },
    price: {
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.primary,
    }
})