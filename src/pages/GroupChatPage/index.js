import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { customColors } from '../../utils'
import { Gap, MyChatItem, OtherChatItem, StackHeader, TextInputSend } from '../../components'
import { DummyMyAva, DummyUser1, DummyUser5, DummyUser6 } from '../../assets'

const GrouopChatPage = ({ navigation, route }) => {
    const [chat, setChat] = useState('')
    const [chats, setChats] = useState([
        {
            id: 1,
            from: 'me',
            chat: 'Hello kawan, apa kabar kalian semua, baikkah?',
            data: {
                name: 'Ical',
                img: DummyMyAva
            }
        },
        {
            id: 2,
            from : 'other',
            chat: 'Hallo, alhamdulillah saya baik, yang lain?',
            data: {
                name: 'James Curt',
                img: DummyUser6
            }
        },
        {
            id: 3,
            from: 'other',
            chat: 'Baik sekali, bagaimana jika kita mulai diskusi?',
            data: {
                name: 'James Curt',
                img: DummyUser1
            }
        },
        {
            id: 4,
            from: 'other',
            chat: 'Aku ikut aja hehehe',
            data: {
                name: 'James Curt',
                img: DummyUser5
            }
        },
        {
            id: 5,
            from: 'me',
            chat: 'Lets talk about this guys, how’s everyone ???',
            data: {
                name: 'Ical',
                img: DummyMyAva
            }
        }
    ])
    return (
        <>
            <StackHeader
                title={route.params.title}
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
                                        <MyChatItem msg={chat.chat}/>
                                        <Gap height={20}/>
                                    </View>
                                    : <View key={chat.id}>
                                        <OtherChatItem img={chat.data.img} msg={chat.chat}/>
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
                <TextInputSend
                    onChangeText={(text) => setChat(text)}
                    placeholder={"Kirim Pesan Untuk James Curt"}
                    onSend={() => {
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
                    }}
                    value={chat}
                />
            </View>
        </>
    )
}

export default GrouopChatPage

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