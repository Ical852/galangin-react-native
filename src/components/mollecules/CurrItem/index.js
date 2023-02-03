import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import MidPercentage from '../MidPercentage'

const CurrItem = ({ img, title, owner, price, onPress, item }) => {
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
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
            <Image source={img} style={styles.img}/>
            <View style={styles.detailinfo}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.owner}>{owner}</Text>
                <View style={{ marginLeft: 2 }}>
                    <MidPercentage
                        date={date}
                        percentage={percentage}
                        price={price}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CurrItem

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginBottom: 16,
        height: 110,
        backgroundColor: customColors.white,
        elevation: 3,
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row'
    },
    img: {
        width: 90,
        height: 90,
        borderRadius: 4
    },
    detailinfo: {
        flex: 1,
    },
    title: {
        fontSize: 12,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary,
        marginLeft: 10
    },
    owner: {
        marginTop: 2,
        marginLeft: 10,
        fontSize: 10,
        fontFamily: customFonts.light,
        color: customColors.text.secondary
    }
})