import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IcBtnChat, IcOther } from '../../../assets'
import { customColors, customFonts } from '../../../utils'
import { Gap } from '../../atoms'

const OwnerArea = ({ name, role, onPress, img, other, noChat }) => {
  return (
    <View style={styles.container}>
        <Image source={img} style={styles.img}/>
        <View style={styles.data}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
        </View>
        {
            !noChat &&
            <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                {
                    other ?
                    (   
                        <>
                            <Gap height={12}/>
                            <IcOther/>
                        </>
                    ) :
                    <IcBtnChat/>
                } 
            </TouchableOpacity>
        }
    </View>
  )
}

export default OwnerArea

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 24,
    },
    img: {
        height: 46,
        width: 46,
        borderRadius: 50,
        resizeMode: 'cover'
    },
    data: {
        flex: 1,
        marginLeft: 12
    },
    name: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    role:{ 
        fontSize: 14,
        fontFamily: customFonts.light,
        color: customColors.text.secondary
    }
})