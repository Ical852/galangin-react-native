import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { customColors, customFonts } from '../../utils'
import { IcBack, IcTime } from '../../assets'
import { CampaignNewsItem, CustomButton, CustomInput, Gap, MainComments, MainPercentage, MicroButton, OwnerArea, TextInputSend, ThreeToggle } from '../../components'
import Modal from 'react-native-modal'

const CampaignDetail = ({ navigation, route }) => {
    const [detailData, setDetailData] = useState(route.params.data)
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState('')

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
    const [textStat, setTextStat] = useState('')
    const [open, setOpen] = useState([])
    const [texting, setTexting] = useState(false)
    const [textVal, setTextVal] = useState('')
    const [commentId, setCommentId] = useState('')

    const [currentToggle, setCurrentToggle] = useState('first')
    const RenderDescription = () => {
        return (
            <View style={styles.description}>
                <Text style={styles.descriptiontext}>Campaign Description</Text>
                <Text style={styles.desctext}>{detailData.desc}</Text>
            </View>
        )
    }
    const RenderCampaingNews = () => {
        return (
            <View>
                <Text style={styles.descriptiontext2}>Campaign News</Text>
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
                <MainPercentage 
                    current={totaldonated}
                    total={detailData.target}
                    percentage={percentage}
                />
                <Gap height={24}/>
                <OwnerArea
                    img={{ uri: detailData.user.image }}
                    name={detailData.user.name}
                    role={"Campaigns Owner"}
                    onPress={() => navigation.navigate('ChatPage', {
                        type: 'request',
                        data: detailData
                    })}
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
                !texting ?
                <CustomButton
                    title={"Donate this Campaign"}
                    onPress={() => setModal(true)}
                />
                : <TextInputSend
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
                        setTexting(false)
                    }}
                    placeholder={textStat == 'comment' ? 'Write your comments here..' : "Write your reply here.."}
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
                <CustomInput
                    title={"Donation Amount"}
                    placeholder={"Fill the amount here..."}
                    donate
                    keyboardType={"numeric"}
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                />
                <Gap height={16}/>
                <CustomInput
                    title={"Donation Message"}
                    placeholder={"Write your commments here..."}
                    donate
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <Text style={styles.donatetext}>Fill the form for your donation</Text>
                <Gap height={24}/>
                <CustomButton
                    title={"Donate"}
                    onPress={() => navigation.navigate('Payment', {
                        amount: amount,
                        message: message,
                        campaign: detailData,
                        user: global.user
                    })}
                />
            </View>
        </Modal>
    </>
  )
}

export default CampaignDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white
    },
    detailImg: {
        height: 330,
        width: Dimensions.get('window').width,
        resizeMode: 'cover'
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
        marginHorizontal: 24
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
        marginLeft :24
    },
    descwbtn: {
        marginHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalbody: {
        backgroundColor: customColors.white,
        padding: 20,
        borderRadius: 12
    },
    donatetext: {
        fontSize: 12,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary,
        textAlign: 'center',
        marginTop: 16
    }
})