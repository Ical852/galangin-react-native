import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const NotifItem = ({ title, date }) => {
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}> Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.Lorem
            Ipsum has been the industry 's standard...</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default NotifItem

const styles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: customColors.white,
        elevation: 3,
        marginHorizontal: 24,
        flexDirection: 'row',
        padding: 24,
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 20
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    desc: {
        fontSize: 10,
        fontFamily: customFonts.medium,
        color: customColors.text.secondary
    },
    date: {
        marginLeft: 20,
        fontSize: 10,
        fontFamily: customFonts.light,
        color: customColors.text.secondary
    }
})