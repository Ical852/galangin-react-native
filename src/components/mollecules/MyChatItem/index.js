import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const MyChatItem = ({ msg }) => {
  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <Text style={styles.text}>{msg}</Text>
        </View>
    </View>
  )
}

export default MyChatItem

const styles = StyleSheet.create({
    main: {
        alignItems: 'flex-end',
    }, 
    container: {
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginRight: 16,
        backgroundColor: customColors.def.chat,
        maxWidth: '60%',
        alignItems: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12
    },
    text: {
        fontSize: 14,
        fontFamily: customFonts.regular,
        color: customColors.text.primary
    }
})