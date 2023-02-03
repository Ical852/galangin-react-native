import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Gap, MsgWithBtn, NotifItem, StackHeader } from '../../components'
import { customColors, customFonts } from '../../utils'
import { IlMtyNotif } from '../../assets'

const NotificationPage = ({ navigation }) => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Your account has been verified",
            date: "20 May"
        },
        {
            id: 2,
            title: "You got Silver Hero Level !!!",
            date: "21 May"
        },
        {
            id: 3,
            title: "Join people’s campaigns now !",
            date: "22 May"
        },
        {
            id: 4,
            title: "New campaigns, Check it out !!!",
            date: "23 May"
        },
    ])
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <StackHeader title={"Notificaions"} onPress={() => navigation.goBack()}/>
        {
            notifications.length < 1 ?
            <View style={styles.emptycontent}>
                <Gap height={150}/>
                <IlMtyNotif/>
                <MsgWithBtn
                    titleMsg={"No Notifications Yet"}
                    message={"Seems like there is no any notifications for you yet"}
                    titleBtn={"Back to Home"}
                    onPress={() => navigation.replace('Main')} 
                />
            </View>
            :
            <View style={styles.content}>
                <Text style={styles.title}>Account Info</Text>
                <Gap height={16}/>
                {
                    notifications.map((notif) => {
                        return (
                            <NotifItem 
                                key={notif.id}
                                title={notif.title}
                                date={notif.date}
                            />
                        )
                    })
                }
            </View>
        }
        <Gap height={150}/>
    </ScrollView>
  )
}

export default NotificationPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white,
    },
    emptycontent: {
        alignItems: 'center'
    },
    content: {

    },
    title: {
        fontSize: 16,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary,
        marginTop: 24,
        marginLeft: 24
    }
})