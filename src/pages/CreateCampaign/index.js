import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React from 'react'
import { customColors, customFonts, linkApi, showError, showSuccess } from '../../utils'
import { CustomButton, CustomInput, Gap, StackHeader } from '../../components'
import { IcWhitePlus } from '../../assets'
import * as ImagePicker from 'react-native-image-picker'
import { useState } from 'react'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-date-picker'
import axios from 'axios'

const CreateCampaign = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [modal, setModal] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState(0)
  const [desc, setDesc] = useState('')

  const onSubmit = async () => {
    const form = new FormData()
    console.log(image);
    form.append('user_id', global.user.id)
    form.append('category_id', 1)
    form.append('title', title)
    form.append('target', target)
    form.append('max_date', dateFormatted().toString())
    form.append('desc', desc)
    form.append('image', {
      uri: image.uri,
      name: image.fileName,
      type: image.type
    })

    await axios({
      url: `${linkApi}/campaign`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: form
    })
    .then(res => {
      showSuccess('Success Create Campaign')
      setTimeout(() => {
        navigation.replace('CreateCampaignSuccess')
      }, 500);
    })
    .catch(err => {
      showError('Something went wrong')
      console.log(err.response.data);
    })
  }

  const dateFormatted = () => {
    const format = new Date(date)
    return `${format.getFullYear()}-${format.getMonth()+1}-${format.getDate()}`
  }

  const pickImage = () => {
    setModal(true)
  }

  const onGallery = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo'
    }).then(res => {
      if (res.didCancel) {
        setModal(false)
        return showError('Sepertinya anda membatalkan mengambil gambar')
      }
      setImage(res.assets[0])
      setModal(false)
    })
  }

  const onCamera = () => {
    ImagePicker.launchCamera({
      mediaType: 'photo'
    }).then(res => {
      if (res.didCancel) {
        setModal(false)
        return showError('Sepertinya anda membatalkan mengambil gambar')
      }
      setImage(res.assets[0])
      setModal(false)
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StackHeader title={"Create Campaign"} onPress={() => navigation.goBack()}/>
      <View style={styles.imageinput}>
        <Text style={styles.imginputext}>Campaign Image</Text>
        {
          image == null ?
          <View style={styles.imginputfield}>
            <TouchableOpacity style={styles.plusIcon} activeOpacity={0.5} onPress={pickImage}>
              <IcWhitePlus/>
            </TouchableOpacity>
          </View>
          :
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: image.uri }} style={styles.imginputfield} />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.formArea}>
        <CustomInput
          title={"Campaigns Title"}
          placeholder={"Masukkan Campaigns Title"}
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <Gap height={20}/>
        <CustomInput
          title={"Campaigns Target"}
          placeholder={"Masukkan Campaigns Target"}
          onChangeText={(text) => setTarget(text)}
          value={target}
          keyboardType={'numeric'}
        />
        <Gap height={20}/>
        <CustomInput
          title={"Campaigns Max Date"}
          placeholder={"Masukkan Campaigns Max Date"}
          onChangeText={(text) => setDate(text)}
          value={dateFormatted()}
          date
          datePick={() => {
            setDateOpen(true)
          }}
        />
        <Gap height={20}/>
        <CustomInput
          title={"Campaigns Descriptions"}
          placeholder={"Masukkan Campaigns Descriptions"}
          onChangeText={(text) => setDesc(text)}
          value={desc}
        />
        <Gap height={32}/>
        <CustomButton
          title={"Create Campaign"}
          onPress={() => onSubmit()}
        />
      </View>
      <Gap height={120}/>

      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
        animationInTiming={800}
        animationOutTiming={800}>
        <View style={styles.modalbody}>
            <Text style={styles.modaltitle}>Pilih Tipe Pengambilan Gambar</Text>
            <Gap height={12}/>
            <CustomButton
              title={"Gallery"}
              onPress={onGallery}
            />
            <Gap height={12}/>
            <CustomButton
              title={"Camera"}
              onPress={onCamera}
            />
        </View>
      </Modal>

      <DatePicker 
        modal
        open={dateOpen}
        date={date}
        onConfirm={(date) => {
          setDateOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setDateOpen(false)
        }}
        mode={'date'}
      />
    </ScrollView>
  )
}

export default CreateCampaign

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white
  },
  imageinput: {
    marginHorizontal: 24,
    marginTop: 32
  },
  imginputext:{ 
    fontSize: 14,
    fontFamily: customFonts.regular,
    color: customColors.text.primary
  },
  imginputfield:{ 
    height: 132,
    borderWidth: 1,
    borderColor: customColors.def.greyP,
    marginTop: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  plusIcon: {
    height: 40,
    width: 40,
    backgroundColor: customColors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formArea: {
    marginHorizontal: 24,
    marginTop : 20
  },
  modalbody: {
    backgroundColor: customColors.white,
    padding: 20,
    borderRadius: 12
  },
  modaltitle: {
    textAlign: 'center',
    fontFamily: customFonts.semiBold,
    color: customColors.black
  }
})