import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { customColors } from '../../utils'
import { Gap, MyChatItem, OtherChatItem, RequestedItem, RequestItem, StackHeader, TextInputSend } from '../../components'
import { DummyMyAva } from '../../assets'

const ChatPage = ({ navigation, route }) => {
    const [param, setParam] = useState(route.params.type)
    const [chat, setChat] = useState('')
    const [campaignData, setCampaignData] = useState(route.params.data)

    const [ownerName, setOwnerName] = useState('')
    const [ownerPic, setOwnerPic] = useState('')

    useEffect(() => {
        if (param === 'request') {
            setChat('apa saya boleh ikut berpartisipasi ?')
            setOwnerName(campaignData.user.name)
            setOwnerPic({ uri: campaignData.user.image })
        }
        if (param === 'normal') {
            setOwnerName(route.params.name)
            setOwnerPic(route.params.image)
        }
    }, [])
    const [chats, setChats] = useState([
        {
            id: 1,
            from: 'me',
            chat: 'Hello james,  apa saya bisa bantu di campaign?',
            data: {
                name: 'Ical',
                img: DummyMyAva
            }
        },
        {
            id: 2,
            from : 'other',
            chat: 'Bisa, mungkin dengan menyebarkan campaign?',
            data: {
                name: ownerName,
                img: ownerPic
            }
        }
    ])
    return (
        <>
            <StackHeader
                title={ownerName}
                onPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Gap height={30}/>
                {
                    chats.map((chat, index) => {
                        return (
                            <>
                                {
                                    chat.from === 'me' ?
                                    <View key={chat.id}>
                                        {
                                            (chat.requested !== null && chat.requested !== undefined) &&
                                            <View key={chat.id}>
                                                <RequestedItem detailData={campaignData}/>
                                                <Gap height={12}/>
                                            </View>
                                        }
                                        <MyChatItem msg={chat.chat}/>
                                        <Gap height={20}/>
                                    </View>
                                    : <View key={chat.id}>
                                        <OtherChatItem img={ownerPic} msg={chat.chat}/>
                                        <Gap height={20}/>
                                    </View>
                                }
                            </>
                        )
                    })
                }
                <Gap height={150}/>
            </ScrollView>
            <View style={styles.bottom}>
                {
                    param === 'request' &&
                    <>
                        <RequestItem onClose={() => setParam('')} price={campaignData.target} img={{ uri: campaignData.image }} title={campaignData.title} />
                        <Gap height={16}/>
                    </>
                }
                <TextInputSend
                    autoFocus={param === 'request'}
                    onChangeText={(text) => setChat(text)}
                    placeholder={"Kirim Pesan Untuk James Curt"}
                    onSend={() => {
                        if(param === 'request'){
                            const newChats = [...chats]
                            newChats.push({
                                id: 1,
                                from: 'me',
                                chat: chat,
                                data: {
                                    name: 'Ical',
                                    img: DummyMyAva
                                },
                                requested: true
                            })
                            setChats(newChats)
                            setParam('')
                            setChat('')
                        } else {
                            const newChats = [...chats]
                            newChats.push({
                                id: 1,
                                from: 'me',
                                chat: chat,
                                data: {
                                    name: 'Ical',
                                    img: DummyMyAva
                                }
                            })
                            setChats(newChats)
                            setChat('')
                        }
                    }}
                    value={chat}
                />
            </View>
        </>
    )
}

export default ChatPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white
    },
    bottom: {
        marginHorizontal: 24,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width - 48,
        marginBottom: 26
    }
})