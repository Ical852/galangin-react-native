import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IcChat, IcChatActive, IcExplore, IcExploreActive, IcHome, IcHomeActive, IcProfile, IcProfileActive } from '../../../assets'
import { customColors, customFonts } from '../../../utils'

const NavItem = ({ icon, active, title, onPress }) => {

    const RenderIcon = () => {
        if (icon === 'home') {
            return active ? <IcHomeActive/> : <IcHome/>
        } else if (icon === 'explore') {
            return active ? <IcExploreActive/> : <IcExplore/>
        } else if (icon === 'chat') {
            return active ? <IcChatActive/> : <IcChat/>
        } else if (icon === 'profile') {
            return active ? <IcProfileActive/> : <IcProfile/>
        } else {
            return active ? <View/> : <View/>
        }
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.5}>
            <RenderIcon/>
            <Text style={styles.title(active)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default NavItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title : (active) => ({
        fontSize: 14,
        fontFamily: customFonts.medium,
        color: active ? customColors.primary : customColors.secondary,
        marginTop: 2
    })
})