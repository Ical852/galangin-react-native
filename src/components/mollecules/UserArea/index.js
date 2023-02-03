import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { IcOther } from '../../../assets'
import { customColors, customFonts } from '../../../utils'

const UserArea = ({ img, name, date }) => {
  return (
    <>
        <View style={styles.ownerArea}>
            <Image source={img} style={styles.img}/>
            <View style={styles.detail}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
        <View style={styles.other}>
            <IcOther/>
        </View>
    </>
  )
}

export default UserArea

const styles = StyleSheet.create({
    img: {
        height: 35,
        width: 35,
        borderRadius: 50
    },
    ownerArea: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detail: {
        flex: 1,
        marginLeft: 12,
    },
    other: {
        position: 'absolute',
        top: 21,
        right: 12
    },
    name: {
        fontSize: 12,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    date: {
        fontSize: 10,
        fontFamily: customFonts.light,
        color: customColors.text.secondary
    },
})