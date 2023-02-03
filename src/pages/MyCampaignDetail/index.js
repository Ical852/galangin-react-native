import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { customColors, customFonts } from '../../utils'
import { IcBack, IcTime } from '../../assets'
import { CampaignNewsItem, CustomButton, Gap, MainComments, MainPercentage, MicroButton, OwnerArea, TextInputSend, ThreeToggle } from '../../components'
import Modal from 'react-native-modal'

const MyCampaignDetail = ({ navigation, route }) => {
    const [detailData, setDetailData] = useState(route.params.data)

    let percentage = 0
    let totaldonated = 0
    const onepercentprice = detailData.target / 100

    let date = "1"

    const getDays = () => {
        const startDate = new Date()
        const endDate = detailData.max_date
        const diffInMs = new Date(endDate) - new Date(startDate)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        date = Math.floor(diffInDays)
    }

    if (detailData) {
        detailData.campaign_donation.map(data => {
            totaldonated += data.donation_amount
        })
        percentage = (totaldonated / onepercentprice).toString().substring(0, 3)
        getDays()
    }

    const [modal, setModal] = useState(false)
    const [commentId, setCommentId] = useState('')
    const [textStat, setTextStat] = useState('')
    const [open, setOpen] = useState([])
    const [texting, setTexting] = useState(false)
    const [textVal, setTextVal] = useState('')

    const [currentToggle, setCurrentToggle] = useState('first')
    const RenderDescription = () => {
        return (
            <View style={styles.description}>
                <View style={styles.desctop}>
                    <Text style={styles.descriptiontext}>Campaign Description</Text>
                    <TouchableOpacity style={styles.updatebtn} onPress={() => {
                        setTextStat('desc')
                        setTexting(!texting)
                    }}>
                        <Text style={styles.updateText}>Update Desc</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.desctext}>{detailData.desc}</Text>
            </View>
        )
    }
    const RenderCampaingNews = () => {
        return (
            <View>
                <View style={styles.desctop2}>
                    <Text style={styles.descriptiontext2}>Campaign News</Text>
                    <TouchableOpacity style={styles.updatebtn} onPress={() => {
                        setTextStat('news')
                        setTexting(!texting)
                    }}>
                        <Text style={styles.updateText}>Create News</Text>
                    </TouchableOpacity>
                </View>
                <Gap height={12}/>
                {
                    detailData.campaign_news && (
                        detailData.campaign_news.length > 0 && (
                            detailData.campaign_news.map(data => {
                                return (
                                    <>
                                        <CampaignNewsItem
                                            img={{ uri : data.user.image }}
                                            name={data.user.name}
                                            date={(new Date(data.created_at)).toString().split('GMT')[0]}
                                            desc={data.message}
                                            likes={data.total_likes}
                                            comments={data.campaign_news_comments.length}
                                            onPress={() => navigation.navigate('CampaignNewsDetail', {
                                                data
                                            })}
                                        />
                                        <Gap height={20}/>
                                    </>
                                )
                            })
                        )
                    )
                }
            </View>
        )
    }
    const RenderComments = () => {
        return (
            <View>
                <View style={styles.descwbtn}>
                    <Text style={styles.descriptiontext}>Comments</Text>
                    <MicroButton
                        title={"Comment +"}
                        onPress={() => {
                            setTextStat('comment')
                            setTexting(!texting)
                        }}
                    />
                </View>
                <Gap height={8}/>
                {
                    detailData.campaign_comments && (
                        detailData.campaign_comments.length > 0 && (
                            detailData.campaign_comments.map(data => {
                                return (
                                    <>
                                        <TouchableOpacity>
                                            <MainComments
                                                key={data.id}
                                                img={{ uri: data.user.image }}
                                                name={data.user.name}
                                                date={(new Date(data.created_at)).toString().split('GMT')[0]}
                                                msg={data.comment}
                                                likes={data.total_likes}
                                                replies={data.reply}
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
                                                opReply={open.filter(open => open.id == data.id).length > 0}
                                                plusRep={() => {
                                                    setCommentId(data.id)
                                                    setTextStat('reply')
                                                    setTexting(!texting)
                                                }}
                                            />
                                            <Gap height={16}/>
                                        </TouchableOpacity>
                                    </>
                                )
                            })
                        )
                    )
                }
            </View>
        )
    }

    const RenderToggle = () => {
        return currentToggle == 'first' ? <RenderDescription/>
        : currentToggle == 'second' ? <RenderCampaingNews/>
        : <RenderComments/>
    }

  return (
    <>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View>
                <Image source={{ uri: detailData.image }} style={styles.detailImg}/>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <IcBack/>
                </TouchableOpacity>
                <View style={styles.optionfunc}>
                    <TouchableOpacity style={styles.collabBtn} activeOpacity={0.5} onPress={() => navigation.navigate('CollabUserPage', {
                        data: detailData
                    })}>
                        <Text style={styles.functext}>Collab Users</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeBtn} activeOpacity={0.5} onPress={() => setModal(true)}>
                        <Text style={styles.functext}>Close Campaign</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.timeleft}>
                    <Text style={styles.ongoing}>Ongoing</Text>
                    <View style={styles.time}>
                        <IcTime/>
                        <Text style={styles.left}>{date} days left</Text>
                    </View>
                </View>
            </View>
            <View style={styles.mainContent}>
                <Text style={styles.title}>{detailData.title}</Text>
                <View style={styles.line}/>
                <TouchableOpacity onPress={() => navigation.navigate('DonatorPage', {
                    data: detailData
                })}>
                    <MainPercentage 
                        current={totaldonated}
                        total={detailData.target}
                        percentage={percentage}
                    />
                </TouchableOpacity>
                <Gap height={24}/>
                <OwnerArea
                    img={{ uri: detailData.user.image }}
                    name={detailData.user.name}
                    role={"Campaigns Owner"}
                    noChat
                />
                <Gap height={30}/>
                <ThreeToggle
                    first={"Description"}
                    sec={"Campaign News"}
                    third={"Comments"}
                    current={currentToggle}
                    firstPress={() => setCurrentToggle('first')}
                    secPress={() => setCurrentToggle('second')}
                    thirdPress={() => setCurrentToggle('third')}
                />
                <Gap height={12}/>
                <RenderToggle/>
            </View>
            
            <Gap height={150}/>
        </ScrollView>
        <View style={styles.btnDonate}>
            {
                texting &&
                <TextInputSend
                    onChangeText={(text) => setTextVal(text)}
                    onSend={() => {
                        if (textStat == 'comment') {
                            const newData = detailData
                            newData.campaign_comments.push({
                                campaign_id: detailData.id,
                                comment: textVal,
                                created_at: new Date(),
                                id: newData.campaign_comments.length + 1,
                                reply: [],
                                total_likes: 0,
                                updated_at: new Date(),
                                user: global.user,
                                user_id: global.user.id
                            })
                            setDetailData(newData)
                        }
                        if (textStat == 'reply') {
                            const newData = detailData
                            const index = newData.campaign_comments.findIndex(data => data.id == commentId)
                            newData.campaign_comments[index].reply.push({
                                comment_id: commentId,
                                created_at: new Date(),
                                id: newData.campaign_comments[index].reply.length + 1,
                                reply: textVal,
                                total_likes: 0,
                                updated_at: new Date(),
                                user: global.user,
                                user_id: global.user.id
                            })
                        }
                        if (textStat == 'news') {
                            const newData = detailData
                            newData.campaign_news.push({
                                id: newData.campaign_news.length + 1,
                                campaign_id: detailData.id,
                                user_id: global.user.id,
                                message: textVal,
                                total_likes: 0,
                                created_at: new Date(),
                                updated_at: new Date(),
                                user: global.user,
                                campaign_news_comments: []
                            })
                        }
                        if (textStat == 'desc') {
                            const newData = detailData
                            newData.desc = textVal
                        }
                        setTexting(false)
                    }}
                    placeholder={textStat == 'comment' ? 'Write your comments here..' : textStat ? 'Write your news here...' : "Write your reply here.."}
                    autoFocus
                />
            }
        </View>
        <Modal
            isVisible={modal}
            onBackdropPress={() => setModal(false)}
            animationInTiming={800}
            animationOutTiming={800}>
            <View style={styles.modalbody}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.confirmtext}>Are you sure want you to close this campaign ?</Text>
                </View>
                <Gap height={46}/>
                <CustomButton
                    title={"Close"}
                    onPress={() => {
                        setModal(false)
                        setTimeout(() => {
                            navigation.goBack()
                        }, 1000)
                    }}
                />
            </View>
        </Modal>
        
    </>
  )
}

export default MyCampaignDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white
    },
    detailImg: {
        height: 330,
        width: Dimensions.get('window').width
    },
    content: {
        flex: 1,
        marginTop: -45
    },
    timeleft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        backgroundColor: customColors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        alignItems: 'center'
    },
    time: {
        flexDirection: 'row',
        marginRight: 24,
        alignItems: 'center',
    },
    ongoing: {
        marginLeft: 24,
        fontSize: 12,
        fontFamily: customFonts.semiBold,
        color: customColors.primary
    },
    left: {
        fontSize: 12,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary,
        marginLeft: 8,
    },
    mainContent: {
    },
    title: {
        marginHorizontal: 24,
        marginTop: 16,
        fontSize: 20,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    line: {
        height: 1,
        backgroundColor: customColors.def.greyL,
        marginHorizontal: 24,
        marginTop: 16,
        marginBottom: 16
    },
    btnDonate: {
        marginHorizontal: 24,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width - 48,
        marginBottom: 26
    },
    description: {
        marginHorizontal: 24,
    },
    descriptiontext: {
        fontSize: 12,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    desctext: {
        fontSize: 12,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary,
        marginTop: 12
    },
    backBtn: {
        position: 'absolute',
        width: 26,
        height: 26,
        backgroundColor: customColors.white,
        borderRadius: 6,
        top: 24,
        left: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptiontext2: {
        fontSize: 12,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary,
    },
    descwbtn: {
        marginHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalbody: {
        backgroundColor: customColors.white,
        padding: 20,
        borderRadius: 12,
    },
    donatetext: {
        fontSize: 12,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary,
        textAlign: 'center',
        marginTop: 16
    },
    desctop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    desctop2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 24
    },
    updatebtn: {
        height: 24,
        width: 100,
        borderRadius: 8,
        backgroundColor: customColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText: {
        fontSize: 10,
        fontFamily: customFonts.medium,
        color: customColors.white
    },
    optionfunc: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 48,
        top: 267,
        marginHorizontal: 24
    },
    collabBtn: {
        height: 24,
        width: 120,
        backgroundColor: customColors.def.green1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtn: {
        height: 24,
        width: 120,
        backgroundColor: customColors.def.red,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    functext: {
        fontSize: 10,
        fontFamily: customFonts.medium,
        color: customColors.white
    },
    confirmtext: {
        fontSize: 14,
        textAlign: 'center',
        width: 218,
        fontFamily: customFonts.regular,
        color: customColors.text.primary
    }
})