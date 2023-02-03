import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserArea from '../UserArea'
import { IcLikesAlt, IcLikesFil } from '../../../assets'
import { customColors, customFonts } from '../../../utils'

const MainReplies = ({ img, name, date, msg, likes, news }) => {
  return (
    <View activeOpacity={0.5} style={styles.container}>
        <UserArea
            img={img}
            name={name}
            date={date}
        />
        <Text style={styles.msg}>{msg}</Text>
        <View style={styles.func}>
            {
                news ? <IcLikesAlt/> : <IcLikesFil/>
            }
            <Text style={styles.likes(news)}>{likes}</Text>
        </View>
    </View>
  )
}

export default MainReplies

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: customColors.white,
        elevation: 3,
        marginLeft: '20%',
        marginRight: 24,
        borderRadius: 8
    },
    msg: {
        fontSize: 11,
        fontFamily: customFonts.regular,
        color: customColors.text.primary,
        marginTop: 12
    },
    func: {
        flexDirection: 'row',
        marginTop: 16
    },
    likes: (news) => ({
        fontSize: 10,
        fontFamily: customFonts.semiBold,
        color: news ? customColors.text.primary : customColors.primary,
        marginLeft: 6
    })
})