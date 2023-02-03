import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const ChatItems = ({ img, name, msg, time, notif, member, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={onPress}>
        <View style={styles.user}>
            <Image source={img} style={styles.img}/>
            <View style={styles.detail}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.msg(notif)}>{member ? `${member} : ` : ''}{msg}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.time}>{time}</Text>
                {
                    notif ? 
                    <View style={styles.bubble}>
                        <Text style={styles.notif}>{notif}</Text>
                    </View>
                    :
                    <View style={styles.bubble2}>
                        <Text style={styles.notif}>{notif}</Text>
                    </View>
                }
            </View>
        </View>
        <View style={styles.line}/>
    </TouchableOpacity>
  )
}

export default ChatItems

const styles = StyleSheet.create({
    container: {
        height: 66,
        marginHorizontal: 24,
        marginBottom: 20
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        width: 46,
        height: 46,
        borderRadius: 50
    },
    detail: {
        flex: 1,
        marginLeft: 12
    },
    name: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    msg: (notif) => ({
        fontSize: 14,
        fontFamily: customFonts.light,
        color: notif? customColors.text.primary : customColors.text.secondary 
    }),
    info: {
        alignItems: 'center'
    },
    bubble: {
        height: 21,
        width: 21,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: customColors.primary,
        borderRadius: 50,
        marginTop: 4
    },
    bubble2: {
        height: 21,
        width: 21,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 4
    },
    notif: {
        fontSize: 10,
        fontFamily: customFonts.medium,
        color: customColors.white
    },
    time: {
        fontSize: 14,
        fontFamily: customFonts.light,
        color: customColors.text.secondary
    },
    line: {
        height: 1,
        backgroundColor: customColors.def.greyL,
        marginTop: 20
    }
})