import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts, linkApi, showError } from '../../utils'
import LinearGradient from 'react-native-linear-gradient'
import { IcNotifPurp, IcRetry, IcSearchPurp } from '../../assets'
import { BigItem, CurrItem, Gap, Info, TitleDesc, UserPoints } from '../../components'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const Explore = () => {
  const navigation = useNavigation()

  const [campaigns, setCampaigns] = useState([])
  const [topCampaigns, setTopCampaigns] = useState([])

  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  useEffect(() => {
    getTopCampaigns()
    getCampaigns()
  }, [])

  const getCampaigns = async () => {
    await setCampaigns([])
    setLoading(true)
    await axios({
        url: `${linkApi}/campaign`,
        method: 'GET',
      })
      .then(res => {
        setLoading(false)
        if (res.data.data === undefined) {
          showError('Failed to Get Campaigns Data')
        }
        setCampaigns(res.data.data)
      })
      .catch(err => {
        setLoading(false)
        console.log(err.response)
      })
  }

  const getTopCampaigns = async () => {
    await setTopCampaigns([])
    setLoading2(true)
    await axios({
        url: `${linkApi}/campaign/cat/5`,
        method: 'GET',
      })
      .then(res => {
        setLoading2(false)
        if (res.data.data === undefined) {
          showError('Failed to Get Campaigns Data')
        }
        setTopCampaigns(res.data.data)
      })
      .catch(err => {
        setLoading2(false)
        console.log(err.response)
      })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <LinearGradient 
        colors={[customColors.gradient.sec, customColors.gradient.main]}
        style={styles.headerBox}>
        <View style={styles.search}>
          <View style={styles.searchBox}>
            <IcSearchPurp/>
            <TextInput style={styles.input} placeholder={"Explore campaigns"}/>
          </View>
          <TouchableOpacity style={styles.notifbox} onPress = {() => navigation.navigate('Notification')}>
            <IcNotifPurp/>
          </TouchableOpacity>
        </View>
        <Gap height={16}/>
      </LinearGradient>
      <View style={{ marginTop: -40 }}>
        <UserPoints
          donated={global.donated}
          bonus={global.donated * 0.1}
        />
      </View>
      <Gap height={16}/>
      <Info
        title={"Info"}
        desc={"there are some campaign that already needed money instantly to reach theirs, help them now!. donate an instant campaign give you dp "}
      />
      <View style={styles.linegap}></View>
      <TitleDesc
        title={"Top Trending Campaigns"}
        subtitle={"Some trending campaigns you might like to donate"}
      />
      {
        loading2 && (
          <View style={styles.loadingtop}>
            <ActivityIndicator color={customColors.primary} size={'large'}/>
            <Text style={styles.retrytext}>Getting Data</Text>
          </View>
        )
      }
      {
        !loading2 && topCampaigns === undefined && (
          <TouchableOpacity style={styles.loadingtop} onPress={getTopCampaigns}>
            <IcRetry/>
            <Text style={styles.retrytext}>Retry</Text>
          </TouchableOpacity>
        )
      }
      {
        topCampaigns && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Gap width={24}/>
            {
              topCampaigns.length > 0 && (
                topCampaigns.map(data => {
                  return (
                    <BigItem
                      img={{ uri: data.image }}
                      title={data.title}
                      owner={data.user.name}
                      price={data.target}
                      item={data}
                      onPress={() => navigation.navigate('CampaignDetail', {
                        data
                      })}
                    />
                  )
                })
              )
            }
          </ScrollView>
        )
      }
      <TitleDesc
        title={"All Campaigns"}
        subtitle={"Find campaigns you like to donate"}
      />
      <Gap height={12}/>
      {
        loading && (
          <View style={styles.loadingtop}>
            <ActivityIndicator color={customColors.primary} size={'large'}/>
            <Text style={styles.retrytext}>Getting Data</Text>
          </View>
        )
      }
      {
        !loading && campaigns === undefined && (
          <TouchableOpacity style={styles.loadingtop} onPress={getCampaigns}>
            <IcRetry/>
            <Text style={styles.retrytext}>Retry</Text>
          </TouchableOpacity>
        )
      }
      {
        campaigns && (
          campaigns.length > 0 && (
            campaigns.map(data => {
              return (
                <CurrItem
                  img={{ uri: data.image }}
                  title={data.title}
                  owner={data.user.name}
                  price={data.target}
                  item={data}
                  onPress={() => navigation.navigate('CampaignDetail', {
                    data
                  })}
                />
              )
            })
          )
        )
      }
      <Gap height={120}/>
    </ScrollView>
  )
}

export default Explore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white
  },
  headerBox: {
    height: 120
  },
  search: {
    flexDirection: 'row',
    marginTop: 24,
    marginHorizontal: 24
  },
  notifbox: {
    width: 40,
    height: 40,
    backgroundColor: customColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  searchBox : {
    flex: 1,
    backgroundColor: customColors.white,
    marginRight: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal : 12,
    height: 40
  },
  input: {
    marginLeft: 12,
    flex: 1,
  },
  linegap: {
    height: 1,
    backgroundColor: customColors.def.greyL,
    marginTop: 21,
    marginBottom: 16
  },
  loadingtop: {
    height: 241,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retrytext: {
    marginTop: 4,
    fontSize: 16,
    color: customColors.primary,
    fontFamily: customFonts.semiBold
  }
})