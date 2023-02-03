import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, linkApi, showError, showSuccess } from '../../utils'
import { CustomButton, CustomInput, Gap, StackHeader, TextPress } from '../../components'
import { IlEditProfile } from '../../assets'
import { useState } from 'react'
import axios from 'axios'

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState(global.user.name)
  const [email, setEmail] = useState(global.user.email)
  const [phoneNumber, setPhoneNumber] = useState(global.user.phone_number)

  const onSubmit = async () => {
    await axios({
      url: `${linkApi}/user`,
      method: 'POST',
      headers: {
        Authorization: global.token
      },
      data: {
        name: name,
        email: email,
        phone_number: phoneNumber
      }
    })
    .then(res => {
      showSuccess('Update Profile Success')
      global.user = res.data.data
    })
    .catch(err => {
      showError('Something Went Wrong')
      console.log(err.response.data);
    })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StackHeader title={"Edit Profile"} onPress={() => navigation.goBack()}/>
      <View style={styles.contentIl}>
        <IlEditProfile/>
      </View>
      <View style={styles.content}>
        <CustomInput
          onChangeText={(text) => setName(text)}
          title={"Full Name"}
          value={name}
        />
        <Gap height={20}/>
        <CustomInput
          onChangeText={(text) => setEmail(text)}
          title={"Email Address"}
          value={email}
        />
        <Gap height={20}/>
        <CustomInput
          onChangeText={(text) => setPhoneNumber(text)}
          title={"Phone Number"}
          value={phoneNumber}
        />
        <Gap height={30}/>
        <CustomButton
          title={"Save"}
          onPress={onSubmit}
        />
        <Gap height={24}/>
        <View style={{ alignItems: 'center' }}>
          <TextPress
            text={"Change Password? "}
            press={"Here!"}
            onPress={() => navigation.navigate('ChangePassword')}
          />
        </View>
      </View>
      <Gap height={150}/>
    </ScrollView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
  },
  contentIl: {
    alignItems: 'center',
  },  
  content: {
    marginTop: 30,
    marginHorizontal: 32,
  }
})