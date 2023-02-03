import { StyleSheet, View } from 'react-native'
import React from 'react'
import { customColors } from '../../utils'
import { IlResScs } from '../../assets'
import { MsgWithBtn } from '../../components'

const Sended = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <IlResScs/>
        <MsgWithBtn
            titleMsg={"Send Email Success!"}
            message={"We’re sending you a reset link to renew your password, just wait for a moment"}
            titleBtn={"Back To Login"}
            onPress={() => navigation.navigate('SignIn')}
        />
    </View>
  )
}

export default Sended

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})