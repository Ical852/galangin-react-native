import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import NumberFormatter from '../Number'
import MidPercentageIndicator from '../MidPercentageIndicator'
import { Gap } from '../../atoms'

const RequestedItem = ({ detailData }) => {
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

  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <View style={styles.campaign}>
                <Image source={{ uri: detailData.image }} style={styles.img}/>
                <View style={styles.data}>
                    <Text numberOfLines={2} style={styles.title}>{detailData.title}</Text>
                    <Text style={styles.price}>
                        <NumberFormatter
                            number={detailData.target}
                        />
                    </Text>
                </View>
            </View>
            <Gap height={10}/>
            <MidPercentageIndicator fillPrcntg={percentage} white/>
            <View style={styles.sum}>
                <Text style={styles.percent}>{percentage}%</Text>
                <Text style={styles.date}>{date} Days Left</Text>
            </View>
        </View>
    </View>
  )
}

export default RequestedItem

const styles = StyleSheet.create({
    main: {
        alignItems: 'flex-end',
        marginRight: 16
    },
    container: {
        width: 195,
        height: 110,
        backgroundColor: customColors.def.chat,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: customColors.primary,
        padding: 10,
    },
    img: {
        height: 54,
        width: 54,
        borderRadius: 12
    },
    campaign: {
        flexDirection: 'row'
    },
    data: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 12,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    price: {
        fontSize: 12,
        fontFamily: customFonts.medium,
        color: customColors.primary
    },
    percent: {
        fontSize: 10,
        fontFamily: customFonts.semiBold,
        color: customColors.primary,
    },
    sum: {
        flexDirection: 'row',
        marginTop: 6,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    date: {
        fontSize: 8,
        fontFamily: customFonts.light,
        color: customColors.text.secondary,
        marginTop: 7
    }
})