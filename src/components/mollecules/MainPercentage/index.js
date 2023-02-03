import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainPercentageIndicator from '../MainPercentageIndicator'
import NumberFormatter from '../Number'
import { customColors, customFonts } from '../../../utils'

const MainPercentage = ({ current, total, percentage }) => {
  return (
    <View style={styles.container}>
        <View style={styles.total}>
            <Text style={styles.current}>
                <NumberFormatter
                    number={current}
                />
            </Text>
            <Text style={styles.totalM}>
                <NumberFormatter
                    number={total}
                />
            </Text>
        </View>
        <MainPercentageIndicator percent={percentage}/>
        <View style={styles.collected}>
            <Text style={styles.percent}>{percentage}%</Text>
            <Text style={styles.collect}>Collected</Text>
        </View>
    </View>
  )
}

export default MainPercentage

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    collected: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    current: {
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.primary
    },
    totalM: {
        fontSize: 14,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    percent: {
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.primary
    },
    collect: {
        fontSize: 14,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary
    }
})