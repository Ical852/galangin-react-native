import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IcCat, IcNotif } from '../../../assets'
import { customColors, customFonts } from '../../../utils'

const MainHeader = ({ title, onPress }) => {
    return (
        <View style={styles.container}>
            <IcCat/>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onPress}>
                <IcNotif/>
            </TouchableOpacity>
        </View>
    )
}

export default MainHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 24,
        marginTop: 28
    },
    title: {
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    }
})