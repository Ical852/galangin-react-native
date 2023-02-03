import { StyleSheet, View } from 'react-native'
import React from 'react'
import { customColors } from '../../../utils'

const MidPercentageIndicator = ({ fillPrcntg, white }) => {
  return (
    <View>
        <View style={styles.current(white)}/>
        <View style={styles.filled(fillPrcntg)}/>
    </View>
  )
}

export default MidPercentageIndicator

const styles = StyleSheet.create({
    current: (white) => ({
        position: 'absolute',
        height: 5,
        backgroundColor: white ? customColors.white : customColors.def.greyL,
        width: '100%',
        borderRadius: 50
    }),
    filled: (prcntg) => ({
        position: 'absolute',
        height: 5,
        backgroundColor: customColors.primary,
        width: `${prcntg}%`,
        borderRadius: 50
    })
})