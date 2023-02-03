import { StyleSheet, View } from 'react-native'
import React from 'react'
import { customColors } from '../../utils'
import { IlCrCScs } from '../../assets'
import { Gap, MsgWithBtn } from '../../components'

const CreateCampaignSuccess = ({navigation}) => {
  return (
    <View style={styles.container}>
        <IlCrCScs/>
        <Gap height={20}/>
        <MsgWithBtn
            titleMsg={"Create Campaign Success"}
            message={"Your campaign has been created, wait for someone to fund to your campaign"}
            titleBtn={"Back to Home"}
            onPress={() => navigation.replace('Main')}
        />
    </View>
  )
}

export default CreateCampaignSuccess

const styles = StyleSheet.create({
    container: {
        backgroundColor: customColors.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})