import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import { IcCommentAdd, IcLikesAlt, IcOther, IcShareNews } from '../../../assets'
import UserArea from '../UserArea'

const CampaignNewsItem = ({ img, name, date, desc, likes, comments, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={onPress}>
        <UserArea
            img={img}
            name={name}
            date={date}
        />
        <Text style={styles.desc}>{desc}</Text>
        <View style={styles.bottomcontent}>
            <View style={styles.ictext}>
                <IcLikesAlt/>
                <Text style={styles.ictextval}>{likes}</Text>
            </View>
            <View style={styles.ictext2}>
                <IcCommentAdd/>
                <Text style={styles.ictextval}>{comments}</Text>
            </View>
            <IcShareNews/>
        </View>
    </TouchableOpacity>
  )
}

export default CampaignNewsItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: customColors.white,
        elevation: 3,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 12,
    },
    desc: {
        marginTop: 12,
        fontSize: 11,
        fontFamily: customFonts.regular,
        color: customColors.text.primary,
        marginBottom: 32
    },
    bottomcontent:{ 
        flexDirection: 'row',
        position: 'absolute',
        bottom: 12,
        marginHorizontal: 12,
        width: '100%',
    },
    ictext: {
        flexDirection: 'row',
    },
    ictext2: {
        flexDirection: 'row',
        marginLeft: 12,
        flex: 1,
    },
    ictextval: {
        marginLeft: 6,
        fontSize: 10,
        fontFamily: customFonts.semiBold,
        color: customColors.text.secondary,
    }
})