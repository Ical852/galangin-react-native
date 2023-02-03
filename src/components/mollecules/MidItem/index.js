import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import MidPercentage from '../MidPercentage'

const MidItem = ({ title, owner, price, onPress, img, item }) => {
    let percentage = 0
    let totaldonated = 0
    const onepercentprice = price / 100
    
    let date = "1"
    
    const getDays = () => {
        const startDate = new Date()
        const endDate = item.max_date
        const diffInMs = new Date(endDate) - new Date(startDate)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        date = Math.floor(diffInDays)
    }

    if (item) {
        item.campaign_donation.map(data => {
            totaldonated += data.donation_amount
        })
        percentage = (totaldonated / onepercentprice).toString().substring(0, 3)
        getDays()
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
            <View style={styles.imgcon}>
                <Image source={img} style={styles.img}/>
            </View>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <Text style={styles.owner}>{owner}</Text>
            <MidPercentage
                price={price}
                percentage={percentage}
                date={date}
            />
        </TouchableOpacity>
    )
}

export default MidItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: customColors.white,
        elevation: 3,
        width: 180,
        height: 205,
        marginTop: 12,
        marginBottom: 24,
        marginRight: 12,
        borderRadius: 8
    },
    img: {
        width: 164,
        height: 92,
        borderRadius: 4,
    },
    imgcon: {
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary,
        marginLeft: 8,
        marginTop: 8
    },
    owner: {
        fontSize: 10,
        fontFamily: customFonts.light,
        color: customColors.text.primary,
        marginLeft: 8,
        marginTop: 2,
        marginBottom: 2,
        flex: 1,
    }
})