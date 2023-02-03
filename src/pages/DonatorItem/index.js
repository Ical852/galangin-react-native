import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../utils'
import { NumberFormatter } from '../../components'

const DonatorItem = ({ img, name, job, price, date, desc}) => {
  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <View style={styles.userdata}>
                <Image source={img} style={styles.img}/>
                <View style={styles.data}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.job}>{job}</Text>
                </View>
            </View>
            <Text style={styles.amount}>
                <NumberFormatter
                    number={price}
                />
            </Text>
            <Text style={styles.desc}>{desc}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default DonatorItem

const styles = StyleSheet.create({
    main: {
        backgroundColor: customColors.white,
        height: 120,
        elevation: 3,
        marginHorizontal: 24,
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    img: {
        height: 46,
        width: 46,
        borderRadius: 50
    },
    userdata: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    data: {
        marginLeft: 12
    },
    name: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    job: {
        fontSize: 14,
        fontFamily: customFonts.light,
        color: customColors.text.secondary
    },
    amount: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        color: customColors.text.primary,
        marginTop: 8
    },
    desc:{ 
        fontSize: 10,
        fontFamily: customFonts.light,
        color: customColors.text.secondary,
        marginTop: 3
    },
    date: {
        fontSize: 10,
        fontFamily: customFonts.light,
        color: customColors.text.secondary
    }
})