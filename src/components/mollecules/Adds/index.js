import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import { AddBtn } from '../../atoms'

const Adds = ({ img, addText, btnText, onPress }) => {
  return (
    <ImageBackground source={img} style={styles.container} imageStyle={styles.imgstyle}>
        <Text style={styles.text}>{addText}</Text>
        <AddBtn
            title={btnText}
            onPress={onPress}
        />
    </ImageBackground>
  )
}

export default Adds

const styles = StyleSheet.create({
    container: {
        height: 145,
        marginHorizontal: 24,
    },
    imgstyle : {
        borderRadius: 8
    },
    text:{ 
        fontSize: 16,
        fontFamily: customFonts.semiBold,
        color: customColors.white,
        width: 166,
        marginLeft: 16,
        marginTop: 16
    }
})