import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'
import DSumItem from '../DSumItem'
import { Gap } from '../../atoms'
import { DummyLineGap } from '../../../assets'
import NumberFormatter from '../Number'

const DonationSummary = ({ name, email, phone, total }) => {
  return (
    <View style={styles.container}>
        <View style={styles.line}/>
        <View style={styles.content}>
            <Text style={styles.title}>Donation Summary</Text>
            <Gap height={13}/>
            <DSumItem keyval={"Full Name"} value={name}/>
            <Gap height={13}/>
            <DSumItem keyval={"Email Address"} value={email}/>
            <Gap height={13}/>
            <DSumItem keyval={"Phone Number"} value={phone}/>
            <Image source={DummyLineGap} style={styles.linegap}/>
            <View style={styles.totalsum}>
                <Text style={styles.totaltext}>Total</Text>
                <Text style={styles.price}>
                    <NumberFormatter
                        number={total}
                    />
                </Text>
            </View>
        </View>
    </View>
  )
}

export default DonationSummary

const styles = StyleSheet.create({
    container: {
        backgroundColor: customColors.white,
        elevation: 3
    },
    line: {
        height: 1,
        backgroundColor: customColors.def.greyL,
    },
    content: {
        padding: 24,
        backgroundColor: customColors.white
    },
    title: {
        fontSize: 16,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    },
    linegap: {
        marginVertical: 16,
        width: Dimensions.get('window').width - 48
    },
    totalsum: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totaltext: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        color: customColors.text.primary
    },
    price: {
        fontSize: 18,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary
    }
})