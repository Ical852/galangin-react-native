import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { customColors, customFonts, linkApi, showError, showSuccess } from '../../utils'
import { IcCatWhite, IcLogout, IcNotifWhite, IcRetry } from '../../assets'
import { BigItem, CurrItem, CustomButton, Gap, Info, MidItem, ProfileDataItem, ProfileSettingsItem, ThreeToggle, TitleDesc, UserPoints } from '../../components'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useEffect } from 'react'
import Modal from 'react-native-modal'
import * as ImagePicker from 'react-native-image-picker'

const Profile = () => {
  const [currentToggle, setCurrentToggle] = useState('first')
  
  const [campaigns1, setCampaigns1] = useState([])
  const [campaigns2, setCampaigns2] = useState([])
  const [campaigns3, setCampaigns3] = useState([])

  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)

  const [modal, setModal] = useState(false)

  useEffect(() => {
    global.user = global.user
  }, [global.user])

  const getPickFromGallery = async () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo'
    }).then(res => {
      if (res.didCancel) {
        setModal(false)
        return showError('Oops change your mind to change photo profile?')
      }
      global.user.image = res.assets[0].uri
      updateProfilePhoto(res.assets[0])
      setModal(false)
    })
  }

  const getPickFromCamera = async () => {
    ImagePicker.launchCamera({
      mediaType: 'photo'
    }).then(res => {
      if (res.didCancel) {
        setModal(false)
        return showError('Oops change your mind to change photo profile?')
      }
      global.user.image = res.assets[0].uri
      updateProfilePhoto(res.assets[0])
      setModal(false)
    })
  }

  const updateProfilePhoto = async (data) => {
    const form = new FormData()
    form.append('file', {
      uri: data.uri,
      name: data.fileName,
      type: data.type
    })
    await AsyncStorage.getItem('user_token').then(async res => {
      await axios({
        url: `${linkApi}/user/photo`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization : JSON.parse(res)
        },
        data: form
      })
      .then(res => {
        console.log(res.data);
        showSuccess('Success Update Profile Picture')
      })
      .catch(err => {
        showError('Something went wrong')
        console.log(err.response.data);
      })
    })
  }

  const getCampaigns1 = async () => {
    setLoading1(true)
    await axios({
      url: `${linkApi}/campaign/user/${global.user.id}`,
      method: 'GET'
    })
    .then(res => {
      setLoading1(false)
      if (res.data.data === undefined) {
        showError('Failed to Get Campaigns Data')
      }
      setCampaigns1(res.data.data)
    })
    .catch(err => {
      setLoading1(false)
      console.log(err.response)
    })
  }

  const getCampaigns2 = async () => {
    setLoading2(true)
    await axios({
      url: `${linkApi}/campaign/cat/3`,
      method: 'GET'
    })
    .then(res => {
      setLoading2(false)
      if (res.data.data === undefined) {
        showError('Failed to Get Campaigns Data')
      }
      setCampaigns2(res.data.data)
    })
    .catch(err => {
      setLoading2(false)
      console.log(err.response)
    })
  }

  const getCampaigns3 = async () => {
    setLoading3(true)
    await axios({
      url: `${linkApi}/campaign/cat/4`,
      method: 'GET'
    })
    .then(res => {
      setLoading3(false)
      if (res.data.data === undefined) {
        showError('Failed to Get Campaigns Data')
      }
      setCampaigns3(res.data.data)
    })
    .catch(err => {
      setLoading3(false)
      console.log(err.response)
    })
  }

  useEffect(() => {
    getCampaigns1()
    getCampaigns2()
    getCampaigns3()
  }, [])
  
  const navigation = useNavigation()

  const onLogout = async () => {
    await AsyncStorage.removeItem('user_token')
    showSuccess('Logout Success')
    setTimeout(() => {
      navigation.replace('SignIn')
    }, 1000);
  }

  const ProfileData = () => {
    return (
      <View>
        <Gap height={16}/>
        <Info
          title={"Info"}
          desc={"important, you need to complete your profile data first, before starting a campaigns. Go to edit profile page and complete your data!. "}
          onPress={() => console.log('pres x')}
        />
        <Gap height={24}/>
        <ProfileDataItem
          title={"Full Name"}
          value={global.user.name}
        />
        <ProfileDataItem
          title={"Email Address"}
          value={global.user.email}
        />
        <ProfileDataItem
          title={"Phone Number"}
          value={global.user.phone_number}
        />
        <ProfileDataItem
          title={"Account Level"}
          value={global.user.level}
        />
      </View>
    )
  }

  const ProfileSettings = () => {
    return (
      <View>
        <Gap height={16}/>
        <ProfileSettingsItem
          icon={"pencil"}
          title={"Edit Profile"}
          desc={"Edit your profile account"}
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ProfileSettingsItem
          icon={"level"}
          title={"My Level"}
          desc={"Level Up by Bonus Poin"}
        />
        <ProfileSettingsItem
          icon={"trx"}
          title={"My Transactions"}
          desc={"Your Transactions History"}
          onPress={() => navigation.navigate('Transaction')}
        />
        <ProfileSettingsItem
          icon={"help"}
          title={"Help Center"}
          desc={"Need more help"}
        />
        <ProfileSettingsItem
          icon={"settings"}
          title={"Settings"}
          desc={"Settings your account"}
        />
      </View>
    )
  }

  const MyCampaigns = () => {
    return (
      <View>
        <Gap height={12}/>
        <TitleDesc
          title={"Your Top Campaign"}
          subtitle={"Your most active donation campaigns"}
        />
        <View style={{ marginLeft: 24 }}>
          {
            loading1 && (
              <View style={styles.loadingtop}>
                <ActivityIndicator color={customColors.primary} size={'large'}/>
                <Text style={styles.retrytext}>Getting Data</Text>
              </View>
            )
          }
          {
            !loading1 && campaigns1 === undefined && (
              <TouchableOpacity style={styles.loadingtop} onPress={getCampaigns1}>
                <IcRetry/>
                <Text style={styles.retrytext}>Retry</Text>
              </TouchableOpacity>
            )
          }
          {
            campaigns1 && (
              campaigns1.length > 0 && (
                <BigItem
                  img={{ uri:campaigns1[0].image }}
                  title={campaigns1[0].title}
                  owner={campaigns1[0].user.name}
                  price={campaigns1[0].target}
                  item={campaigns1[0]}
                  onPress={() => navigation.navigate('MyCampaignDetail', {
                    data: campaigns1[0]
                  })}
                />
              )
            )
          }
        </View>
        <TitleDesc
          title={"Your Joined People’s Campaigns"}
          subtitle={"All of your joined people’s campaigns"}
        />
        <Gap height={12}/>
        {
            loading2 && (
              <View style={styles.loadingtop}>
                <ActivityIndicator color={customColors.primary} size={'large'}/>
                <Text style={styles.retrytext}>Getting Data</Text>
              </View>
            )
        }
        {
          !loading2 && campaigns2 === undefined && (
            <TouchableOpacity style={styles.loadingtop} onPress={getCampaigns2}>
              <IcRetry/>
              <Text style={styles.retrytext}>Retry</Text>
            </TouchableOpacity>
          )
        }
        {
          campaigns2 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Gap width={24}/>
              {
                campaigns2.length > 0 && (
                  campaigns2.map(data => {
                    return (
                      <MidItem
                        key={data.id}
                        img={{ uri: data.image }}
                        title={data.title}
                        owner={data?.user?.name}
                        price={data.target}
                        item={data}
                        onPress={() => navigation.navigate('MyCampaignDetail', {
                          data
                        })}
                      />
                    )
                  })
                )
              }
              <Gap width={12}/>
            </ScrollView>
          )
        }
        <TitleDesc
          title={"Your Campaigns"}
          subtitle={"All of your campaigns"}
        />
        {
            loading3 && (
              <View style={styles.loadingtop}>
                <ActivityIndicator color={customColors.primary} size={'large'}/>
                <Text style={styles.retrytext}>Getting Data</Text>
              </View>
            )
        }
        {
          !loading3 && campaigns3 === undefined && (
            <TouchableOpacity style={styles.loadingtop} onPress={getCampaigns3}>
              <IcRetry/>
              <Text style={styles.retrytext}>Retry</Text>
            </TouchableOpacity>
          )
        }
        {
          campaigns3 && (
            campaigns3.length > 0 && (
              campaigns3.map(data => {
                return (
                  <CurrItem
                    img={{ uri: data.image }}
                    title={data.title}
                    owner={data.user.name}
                    price={data.target}
                    item={data}
                    onPress={() => navigation.navigate('MyCampaignDetail', {
                      data
                    })}
                  />
                )
              })
            )
          )
        }
      </View>
    )
  }

  const RenderToggleItem = () => {
    return currentToggle === 'first' ? <ProfileData/> : currentToggle === 'second' ? <ProfileSettings/> : <MyCampaigns/>
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <LinearGradient
      colors={[customColors.gradient.sec, customColors.gradient.main]}
      style={styles.profileBox}>
        <View style={styles.header}>
          <IcCatWhite/>
          <Text style={styles.headertitle}>My Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <IcNotifWhite/>
          </TouchableOpacity>
        </View>
        <View style={styles.profileData}>
          <TouchableOpacity style={styles.profimgcnt} onPress={() => setModal(true)}> 
            <Image source={{ uri: global.user.image }} style={styles.profimg}/>
          </TouchableOpacity>
          <View style={styles.detailData}>
            <Text style={styles.name}>{global.user.name}</Text>
            <Text style={styles.desc}>{global.user.role}</Text>
            <Text style={styles.desc}>{global.user.level}</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={{ marginTop: -38 }}>
        <UserPoints
          donated={global.donated}
          bonus={global.donated * 0.1}
        />
      </View>
      <Gap height={32}/>
      <ThreeToggle
        current={currentToggle}
        first={"Profile Data"}
        sec={"Profile Settings"}
        third={"My Campaigns"}
        firstPress={() => setCurrentToggle('first')}
        secPress={() => setCurrentToggle('second')}
        thirdPress={() => setCurrentToggle('third')}
      />
      <RenderToggleItem/>
      <TouchableOpacity style={styles.logoutbtn} onPress={onLogout}>
        <Text style={styles.logout}>Logout</Text>
        <IcLogout/>
      </TouchableOpacity>
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
              onPress={getPickFromGallery}
            />
            <Gap height={12}/>
            <CustomButton
              title={"Camera"}
              onPress={getPickFromCamera}
            />
        </View>
      </Modal>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
  },
  profileBox: {
    height: 220,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 21,
    justifyContent: 'space-between',
  },
  headertitle: {
    fontSize: 14,
    fontFamily: customFonts.semiBold,
    color: customColors.white
  },
  profimgcnt: {
    height: 90,
    width: 90,
    backgroundColor: customColors.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profimg: {
    height: 84,
    width: 84,
    backgroundColor: customColors.white,
    borderRadius: 50
  },
  profileData : {
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailData: {
    marginLeft: 12
  },
  name: {
    fontSize: 16,
    fontFamily: customFonts.semiBold,
    color: customColors.white
  },
  desc: {
    fontSize: 14,
    fontFamily: customFonts.regular,
    color: customColors.white,
  },
  logout: {
    fontSize: 16,
    color: customColors.def.white,
    fontFamily: customFonts.semiBold,
    textAlign: 'center',
    marginRight: 6
  },
  logoutbtn: {
    backgroundColor: customColors.def.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 48,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 24,
    elevation: 3
  },
  retrytext: {
    marginTop: 4,
    fontSize: 16,
    color: customColors.primary,
    fontFamily: customFonts.semiBold
  },
  loadingtop: {
    height: 241,
    justifyContent: 'center',
    alignItems: 'center',
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