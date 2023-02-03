import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import { IcDollar, IcHelp, IcLevel, IcPencil, IcRights, IcSettings } from '../../../assets'

const ProfileSettingsItem = ({ onPress, title, desc, icon }) => {
    const RenderIcon = () => {
        return icon == 'pencil' ? <IcPencil/>
        : icon == 'level' ? <IcLevel/>
        : icon == 'trx' ? <IcDollar/>
        : icon == 'help' ? <IcHelp/>
        : <IcSettings/>
    }

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={onPress}>
        <View style={styles.icContainer}>
            <RenderIcon/>
        </View>
        <View style={styles.desc}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desctext}>{desc}</Text>
        </View>
        <IcRights/>
    </TouchableOpacity>
  )
}

export default ProfileSettingsItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 76,
        marginHorizontal: 24,
        marginBottom: 16,
        backgroundColor: customColors.white,
        elevation: 3,
        width: Dimensions.get('window').width - 48,
        borderRadius: 14,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icContainer : {
        backgroundColor: customColors.def.profile,
        height: 52,
        width: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14
    },
    desc: {
        flex: 1,
        marginLeft: 16
    },
    title: {
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    desctext: {
        fontSize: 12,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary
    }
})