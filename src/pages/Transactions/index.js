import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts, linkApi } from '../../utils'
import { Gap, MsgWithBtn, StackHeader, TransactionItem } from '../../components'
import { useState } from 'react'
import { IlMtyTrx } from '../../assets'
import axios from 'axios'
import { useEffect } from 'react'

const TransactionsPage = ({ navigation }) => {
    const [transactions, setTransactions] = useState([])
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const getTrx = async () => {
        await axios.get(`${linkApi}/donation/user/${global.user.id}`)
        .then((res) => {
            console.log(res.data.data);
            setTransactions(res.data.data)
        }).catch((err) => {
            console.log(err.response.data);
        });
    }

    useEffect(() => {
        getTrx()
    }, [])
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StackHeader title={"Transactions"} onPress={() => navigation.goBack()}/>
        {
            transactions.length < 1 ?
            <View style={styles.emptycontent}>
                <Gap height={105}/>
                <IlMtyTrx/>
                <Gap height={30}/>
                <MsgWithBtn
                    titleMsg={"No Transactions Yet"}
                    message={"Seems like you have not donated any campaigns yet"}
                    titleBtn={"Back to Home"}
                    onPress={() => navigation.replace('Main')}
                />
            </View>
            :
            <View style={styles.content}>
                <Text style={styles.title}>All Transactions</Text>
                <Gap height={16}/>
                {
                    transactions.map(item => {
                        return (
                            <TransactionItem
                                key={item.id}
                                title={item.campaign.title}
                                price={item.donation_amount}
                                status={'Success'}
                                date={`${days[new Date(item.created_at).getDay()]}, ${month[new Date(item.created_at).getMonth()]} ${new Date(item.created_at).getDate()}`}
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

export default TransactionsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white
    },
    emptycontent: {
        alignItems: 'center',
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