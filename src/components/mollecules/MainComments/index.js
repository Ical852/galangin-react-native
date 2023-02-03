import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import UserArea from '../UserArea'
import { IcComment, IcCommentAdd, IcLikesAlt, IcLikesFil, IcReplyAdd, IcReplyBlue, IcReplyGreen } from '../../../assets'
import { customColors, customFonts } from '../../../utils'
import MainReplies from '../MainReplies'

const MainComments = ({ replies, img, name, date, msg, likes, opReply, onPress, plusRep, news }) => {
  return (
    <>
        <View style={styles.container} activeOpacity={0.5} >
            <UserArea
                img={img}
                name={name}
                date={date}
            />
            <View style={styles.commentC}>
                <Text style={styles.commentval}>{msg}</Text>
                <View style={styles.func}>
                    <View style={styles.funcview}>
                        {
                            news ? <IcLikesAlt/> : <IcLikesFil/>
                        }
                        <Text style={styles.likeText(news)}>{likes}</Text>
                    </View>
                    <TouchableOpacity style={styles.funcview2} onPress={onPress}>
                        {
                            news ? <IcCommentAdd/> : <IcReplyBlue/>
                        }
                        <Text style={styles.replyText(news)}>{replies.length} Replies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.funcview2} activeOpacity={0.5} onPress={plusRep}>
                        {
                            news ? <IcReplyAdd/> : <IcReplyGreen/>
                        }
                        <Text style={styles.replyplus(news)}>reeply +</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        {
            replies.length > 0 && opReply &&
            replies.map(item => {
                return (
                    <View key={item.id} style={styles.replies}>
                        <MainReplies
                            img={{ uri: item.user.image }}
                            name={item.user.name}
                            date={(new Date(item.created_at)).toString().split('GMT')[0]}
                            msg={item.reply}
                            likes={item.likes}
                            news={news}
                        />
                    </View>
                )
            })
        }
    </>
  )
}

export default MainComments

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        padding: 12,
        backgroundColor: customColors.white,
        elevation: 3,
        borderRadius: 8
    },
    commentC: {
        marginTop: 12,
        width: '100%',
    },
    commentval: {
        fontSize: 11,
        fontFamily: customFonts.regular,
        color: customColors.text.primary
    },
    func: {
        marginTop: 16,
        flexDirection: 'row',
        width: '100%',
    },
    funcview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    funcview2: {
        flexDirection: 'row',
        marginLeft: 12,
        alignItems: 'center',
    },
    likeText:  (news) => ({ 
        fontSize: 10,
        fontFamily: customFonts.semiBold,
        color: news ? customColors.text.primary : customColors.primary,
        marginLeft: 6
    }),
    replyText: (news) =>  ({
        fontSize: 10,
        fontFamily: customFonts.semiBold,
        color: news ? customColors.text.secondary : customColors.def.blue,
        marginLeft: 6
    }),
    replyplus: (news) =>  ({
        fontSize: 10,
        fontFamily: customFonts.semiBold,
        color: news ? customColors.text.secondary : customColors.def.green1,
        marginLeft: 6
    }),
    replies: {
        marginTop: 12
    }
})