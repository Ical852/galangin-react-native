import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import { IcTag } from '../../../assets'
import NumberFormatter from '../Number'

const PeopleCampaigns = ({ name, job, campaign, total, img }) => {
  return (
    <View style={styles.container}>
        <View style={styles.profile}>
            <Image source={img} style={styles.img}/>
            <View style={styles.bio}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.job}>{job}</Text>
            </View>
        </View>
        <Text style={styles.title}>{campaign}</Text>
        <View style={styles.funds}>
            <IcTag/>
            <Text style={styles.total}>
                <NumberFormatter
                    number={total}
                />
            </Text>
        </View>
    </View>
  )
}

export default PeopleCampaigns

const styles = StyleSheet.create({
    container: {
        backgroundColor: customColors.white,
        elevation: 3,
        height: 107,
        width: Dimensions.get('window').width / 2 - 24 - 15,
        borderRadius: 8,
        padding: 10,
    },
    img: {
        width: 32,
        height: 32,
        borderRadius: 6
    },
    profile: {
        flexDirection: 'row'
    },
    bio: {
        marginLeft: 10
    },
    name: {
        fontSize: 14,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    job: {
        fontSize: 11,
        fontFamily: customFonts.regular,
        color: customColors.text.secondary
    },
    funds: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    total: {
        fontSize: 10,
        fontFamily: customFonts.semiBold,
        color: customColors.primary,
        marginLeft: 6
    },
    title: {
        marginTop: 4,
        fontSize: 12,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    }
})