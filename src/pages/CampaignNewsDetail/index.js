import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { customColors, customFonts } from  '../../utils'
import { Gap, MainComments, OwnerArea, StackHeader, TextInputSend } from '../../components'
import { IcComment, IcLikes, IcShare } from '../../assets'

const CampaignNewsDetail = ({navigation, route}) => {
  const [newsData, setNewsData] = useState(route.params.data)
  const [open, setOpen] = useState([])
  const [texting, setTexting] = useState(false)
  const [textVal, setTextVal] = useState('')
  const [textStat, setTextStat] = useState('')
  const [commentId, setCommentId] = useState('')

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <StackHeader
              title={"News Detail"}
              onPress={() => navigation.goBack()}
          />
          <Gap height={24}/>
          <OwnerArea
            img={{ uri: newsData.user.image }}
            name={newsData.user.name}
            role={newsData.user.role}
            other
          />
          <Gap height={16}/>
          <Text style={styles.desc}>{newsData.message}</Text>
          <Text style={styles.date}>{(new Date(newsData.created_at)).toString().split('GMT')[0]}</Text>
          <Gap height={16}/>
          <View style={styles.line}/>
          <View style={styles.social}>
            <View style={styles.total}>
              <Text style={styles.totalamount}>{newsData.total_likes}</Text>
              <Text style={styles.func}>Likes</Text>
            </View>
            <Gap width={20}/>
            <View style={styles.total}>
              <Text style={styles.totalamount}>{newsData.campaign_news_comments.length}</Text>
              <Text style={styles.func}>Comments</Text>
            </View>
          </View>
          <Gap height={12}/>
          <View style={styles.line}/>
          <View style={styles.otherfunc}>
            <IcLikes/>
            <TouchableOpacity activeOpacity={0.5} style={styles.addcomment} onPress={() => {
              setTextStat('comment')
              setTexting(!texting)
            }}>
              <IcComment/>
              <Text style={styles.addcommenttext}>Comment +</Text>
            </TouchableOpacity>
            <IcShare/>
          </View>
          <Gap height={12}/>
          <View style={styles.line}/>
          <Gap height={16}/>
          {
            newsData.campaign_news_comments && (
              newsData.campaign_news_comments.length > 0 && (
                newsData.campaign_news_comments.map(data => {
                  return (
                    <>
                      <MainComments
                          key={data.id}
                          img={{ uri: data.user.image }}
                          name={data.user.name}
                          date={(new Date(data.created_at)).toString().split('GMT')[0]}
                          msg={data.comment}
                          likes={data.total_likes}
                          replies = {
                            data.campaign_news_comments_reply
                          }
                          onPress={() => {
                              const newOpen = [...open]
                              const filter = newOpen.filter(openFilter => openFilter.id == data.id)
                              if (filter.length > 0) {
                                  const newfilter = newOpen.filter(openFilter => openFilter.id != data.id)
                                  return setOpen(newfilter)
                              }
                              newOpen.push(data)
                              setOpen(newOpen)
                          }}
                          opReply={open.filter(openFilter => openFilter.id == data.id).length > 0}
                          plusRep={() => {
                              setCommentId(data.id)
                              setTextStat('reply')
                              setTexting(!texting)
                          }}
                          news
                      />
                      <Gap height={16}/>
                    </>
                  )
                })
              )
            )
          }
          <Gap height={120}/>
      </ScrollView>
      <View style={styles.bottom}>
        {
          texting &&
          <TextInputSend
            onChangeText={(text) => setTextVal(text)}
            onSend={() => {
                if (textStat == 'comment') {
                  const newData = newsData
                  newData.campaign_news_comments.push({
                    campaign_news_id: newData.id,
                    comment: textVal,
                    created_at: new Date(),
                    id: newData.campaign_news_comments.length + 1,
                    campaign_news_comments_reply: [],
                    total_likes: 0,
                    updated_at: new Date(),
                    user: global.user,
                    user_id: global.user.id
                  })
                  setNewsData(newData)
                }
                if (textStat == 'reply') {
                  const newData = newsData
                  const index = newData.campaign_news_comments.findIndex(data => data.id == commentId)
                  newData.campaign_news_comments[index].campaign_news_comments_reply.push({
                    comment_id: commentId,
                    created_at: new Date(),
                    id: newData.campaign_news_comments[index].campaign_news_comments_reply.length + 1,
                    reply: textVal,
                    total_likes: 0,
                    updated_at: new Date(),
                    user: global.user,
                    user_id: global.user.id
                  })
                }
                setTexting(false)
            }}
            placeholder={textStat == 'comment' ? 'Write your comments here..' : "Write your reply here.."}
            autoFocus
          />
        }
      </View>
    </>
  )
}

export default CampaignNewsDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white
    },
    desc: {
      fontSize: 14,
      fontFamily: customFonts.regular,
      color: customColors.text.primary,
      marginHorizontal: 24
    },
    date: {
      fontSize: 12,
      fontFamily: customFonts.light,
      color: customColors.text.secondary,
      marginTop: 12,
      marginLeft: 24
    },
    line: {
      height: 1,
      backgroundColor: customColors.def.greyL,
      width: '100%'
    },
    social: {
      flexDirection: 'row',
      marginHorizontal :24,
      marginTop: 12
    },
    total: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    func: {
      fontSize: 12,
      fontFamily: customFonts.semiBold,
      color: customColors.text.secondary,
      marginLeft: 4
    },
    totalamount: {
      fontSize: 12,
      fontFamily: customFonts.semiBold,
      color: customColors.text.primary
    },
    otherfunc: {
      flexDirection: 'row',
      marginTop: 12,
      marginHorizontal: 24
    },
    addcomment: {
      flexDirection: 'row',
      marginLeft: 24,
      flex: 1,
      alignItems: 'center',
    },
    addcommenttext: {
      fontSize : 10,
      fontFamily: customFonts.medium,
      color: customColors.text.secondary,
      marginLeft: 15
    },
    bottom: {
      marginHorizontal: 24,
      position: 'absolute',
      bottom: 0,
      width: Dimensions.get('window').width - 48,
      marginBottom: 26
    }
})