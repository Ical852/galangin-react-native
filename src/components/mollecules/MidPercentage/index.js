import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import MidPercentageIndicator from '../MidPercentageIndicator'
import { Gap } from '../../atoms'
import NumberFormatter from '../Number'

const MidPercentage = ({ date, percentage, price }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date} days left</Text>
      <Gap height={6}/>
      <MidPercentageIndicator
        fillPrcntg={percentage}
      />
      <View style={styles.pricePrcntg}>
        <Text style={styles.price}>
            <NumberFormatter
                number={price}
            />
        </Text>
        <Text style={styles.percent}>{percentage}%</Text>
      </View>
    </View>
  )
}

export default MidPercentage

const styles = StyleSheet.create({
    container: {
        margin: 8,
    },
    date: {
        fontSize: 8,
        fontFamily: customFonts.light,
        color: customColors.text.secondary
    },
    pricePrcntg: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 10,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    percent: {
        fontSize: 10,
        fontFamily: customFonts.semiBold,
        color: customColors.primary
    }
})