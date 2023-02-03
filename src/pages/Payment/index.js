import { ScrollView, StyleSheet, Text, View, Image, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import { customColors, customFonts, linkApi } from '../../utils'
import { CustomButton, DonationSummary, Gap, MainPercentage, PaymentMehod, StackHeader } from '../../components'
import { DummyDetail } from '../../assets'
import axios from 'axios'
import { useState } from 'react'
import WebView from 'react-native-webview'

const Payment = ({ navigation, route }) => {
    const amount = route.params.amount
    const message = route.params.message
    const campaign = route.params.campaign
    const user = route.params.user

    const [paymentUrl, setPaymentUrl] = useState('')
    const [payment, setPayment] = useState(false)
    const [loading, setLoading] = useState(false)

    let percentage = 0
    let totaldonated = 0
    const onepercentprice = campaign.target / 100

    let date = "1"

    const getDays = () => {
        const startDate = new Date()
        const endDate = campaign.max_date
        const diffInMs = new Date(endDate) - new Date(startDate)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        date = Math.floor(diffInDays)
    }

    if (campaign) {
        campaign.campaign_donation.map(data => {
            totaldonated += data.donation_amount
        })
        percentage = (totaldonated / onepercentprice).toString().substring(0, 3)
        getDays()
    }

    const onPayment = async () => {
        setLoading(true)
        await axios({
            url: `${linkApi}/donation`,
            method: 'POST',
            data: {
                campaign_id: campaign.id,
                user_id: user.id,
                order_id: Math.floor(Math.random() * 1000) + 1,
                donation_amount: amount,
                message: message
            }
        })
        .then(res => {
            setLoading(false)
            console.log(res.data);
            setPaymentUrl(res.data.data.payment_url)
            setPayment(true)
        })
        .catch(err => {
            setLoading(false)
            console.log(err.response.data);
        })
    }

    if (payment) {
        return (
            <View style={{ flex: 1 }}>
                <StackHeader
                    title={"Payment"}
                    onPress={() => {
                        setPayment(false)
                        setTimeout(() => {
                            navigation.replace('DonateSuccess')
                        }, 1000)
                    }}
                />
                <WebView
                    source={{ uri: paymentUrl }}
                    renderLoading={() => <ActivityIndicator size={'large'} color={customColors.primary}/>}
                />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StackHeader
                title={"Donate Payment"}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.img}>
                <Image
                    source={{ uri: campaign.image }}
                    style={styles.imgdetail}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.titletext}>{campaign.title}</Text>
                <View style={styles.line}/>
                <MainPercentage 
                    current={totaldonated}
                    total={campaign.target}
                    percentage={percentage}
                />
                <Gap height={24}/>
                <DonationSummary
                    name={user.name}
                    email={user.email}
                    phone={user.phone_number}
                    total={amount}
                />
                <Gap height={24}/>
                <PaymentMehod/>
                <Gap height={24}/>
                <View style={styles.bottombtn}>
                    {
                        loading ? 
                        <ActivityIndicator size={'large'} color={customColors.primary}/>
                        :
                        <CustomButton
                            title={"Donate Now"}
                            onPress={() => onPayment()}
                        />
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white,
    },
    img: {
        alignItems: 'center',
        marginTop: 24
    },  
    imgdetail: {
        height: 227,
        resizeMode: 'cover',
        width: Dimensions.get('window').width - 48,
        borderRadius: 8
    },
    content: {

    },
    titletext: {
        fontSize: 20,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary,
        marginTop: 16,
        marginHorizontal: 24
    },
    line: {
        height: 1,
        backgroundColor: customColors.def.greyL,
        marginHorizontal: 24,
        marginVertical: 16
    },
    bottombtn: {
        marginHorizontal: 24,
        marginBottom: 24
    }
})