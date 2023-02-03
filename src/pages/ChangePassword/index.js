import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors } from '../../utils'
import { CustomButton, CustomInput, Gap, StackHeader } from '../../components'
import { IlChangePw } from '../../assets'

const ChangePassword = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StackHeader title={"Change Password"} onPress={() => navigation.goBack()}/>
      <View style={styles.il}>
        <IlChangePw/>
      </View>
      <View style={styles.content}>
        <CustomInput
          title={"Current Password"}
          value={"************"}
        />
        <Gap height={20}/>
        <CustomInput
          title={"New Password"}
          value={"************"}
        />
        <Gap height={20}/>
        <CustomInput
          title={"Confirm New Password"}
          value={"************"}
        />
        <Gap height={30}/>
        <CustomButton
          title={"Change"}
        />
      </View>
    </ScrollView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white
  },
  il :{
    alignItems: 'center',
    marginTop: 30
  },
  content: {
    marginHorizontal: 32
  }
})