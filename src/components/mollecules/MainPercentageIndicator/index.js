import { StyleSheet, View } from 'react-native'
import React from 'react'
import { customColors } from '../../../utils'

const MainPercentageIndicator = ({ percent }) => {
  return (
    <View style={styles.container}>
        <View style={styles.current}/>
        <View style={styles.filled(percent)}/>
    </View>
  )
}

export default MainPercentageIndicator

const styles = StyleSheet.create({
    current: {
        position: 'absolute',
        height: 8,
        backgroundColor: customColors.def.greyL,
        width: '100%',
        borderRadius: 54
    },
    filled: (percent) => ({
        position: 'absolute',
        height: 8,
        backgroundColor: customColors.primary,
        width: `${percent}%`,
        borderRadius: 54
    }),
    container: {
        height: 8,
        marginVertical: 10
    }
})