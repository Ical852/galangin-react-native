import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import MidPercentage from '../MidPercentage'

const BigItem = ({ onPress, img, title, owner, price, item }) => {
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
        <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={onPress}>
            <View style={styles.main}>
                <Image source={img} style={styles.img}/>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.owner}>{owner}</Text>
            </View>
            <MidPercentage
                date={date}
                percentage={percentage}
                price={price}
            />
        </TouchableOpacity>
    )
}

export default BigItem

const styles = StyleSheet.create({
    container: {
        height: 205,
        width: Dimensions.get('window').width - 48,
        backgroundColor: customColors.white,
        elevation: 3,
        marginTop: 12,
        marginBottom: 24,
        marginRight: 24,
        borderRadius: 8
    },
    img: {
        width: Dimensions.get('window').width - 48 - 16,
        height: 92,
        borderRadius: 4
    },
    title: {
        fontSize: 12,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary,
        marginTop: 8
    },
    owner: {
        fontSize: 10,
        fontFamily: customFonts.light,
        color: customColors.text.primary,
    },
    main: {
        marginTop: 8,
        marginLeft: 8
    }
})