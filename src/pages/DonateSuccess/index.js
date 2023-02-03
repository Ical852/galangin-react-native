import { StyleSheet, View } from 'react-native'
import React from 'react'
import { customColors } from '../../utils'
import { IlDntScs } from '../../assets'
import { MsgWithBtn } from '../../components'

const DonateSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <IlDntScs/>
        <MsgWithBtn
            titleMsg={"Donate Success"}
            titleBtn={"Back to Home"}
            message={"Thank you for your donation, this is meaningfull for us, hope this campaign will help us all"}
            onPress={() => navigation.replace('Main')}
        />
    </View>
  )
}

export default DonateSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white,
        justifyContent: 'center',
        alignItems: 'center',
    }
})