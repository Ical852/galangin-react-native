import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const OtherChatItem = ({ img, msg }) => {
  return (
    <View style={styles.main}>
      <Image source={img} style={styles.img}/>
      <View style={styles.container}>
        <Text style={styles.text}>{msg}</Text>
      </View>
    </View>
  )
}

export default OtherChatItem

const styles = StyleSheet.create({
    main: {
      marginLeft: 16,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    container: {
      maxWidth: '60%',
      backgroundColor: customColors.primary,
      marginLeft: 12,
      paddingHorizontal: 12,
      paddingVertical: 14,
      borderTopLeftRadius :12,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12
    },
    img: {
      width :32,
      height: 32,
      borderRadius: 50,
    },
    text: {
      fontSize: 14,
      fontFamily: customFonts.regular,
      color: customColors.white
    }
})