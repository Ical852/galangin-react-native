import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TToggleItem } from '../../atoms'
import { customColors } from '../../../utils'

const ThreeToggle = ({ first, sec, third, current, firstPress, secPress, thirdPress }) => {
  return (
    <>
        <View style={styles.container}>
            <TToggleItem
                name={first}
                active={current === 'first'}
                onPress={firstPress}
            />
            <TToggleItem
                name={sec}
                active={current === 'second'}
                onPress={secPress}
            />
            <TToggleItem
                name={third}
                active={current === 'third'}
                onPress={thirdPress}
            />
        </View>
        <View style={styles.line} />
    </>
  )
}

export default ThreeToggle

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    line: {
        height: 1,
        backgroundColor: customColors.def.greyL,
    }
})