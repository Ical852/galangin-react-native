import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IcCrossWhite } from '../../../assets'
import { customColors, customFonts } from '../../../utils'
import NumberFormatter from '../Number'

const RequestItem = ({ onClose, img, title, price }) => {
  return (
    <View style={styles.container}>
        <Image source={img} style={styles.img}/>
        <View style={styles.data}>
            <Text numberOfLines={1} style={styles.text}>{title}</Text>
            <Text style={styles.price}>
                <NumberFormatter
                    number={price}
                />
            </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <IcCrossWhite/>
        </TouchableOpacity>
    </View>
  )
}

export default RequestItem

const styles = StyleSheet.create({
    container: {
        width: '80%',
        padding: 10,
        flexDirection: 'row',
        height: 74,
        backgroundColor: customColors.def.chat,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: customColors.primary,
        alignItems: 'center',
    },
    img: {
        height: 54,
        width: 54,
        resizeMode: 'cover',
        borderRadius: 12
    },
    data:{
        marginLeft: 10
    },
    text: {
        fontSize: 14,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    price: {
        fontSize: 14,
        fontFamily: customFonts.medium,
        color: customColors.primary
    },
    closeBtn: {
        height: 22,
        width: 22,
        backgroundColor: customColors.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        right: 10
    }
})