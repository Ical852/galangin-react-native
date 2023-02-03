import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors, customFonts, linkApi, showError } from '../../utils'
import { Adds, CurrItem, Gap, MainHeader, MidItem, PeopleCampaigns, SearchCampaign, TitleCat, TitleDesc } from '../../components'
import { DummyAd1, DummyAd2, DummyOwner1, DummyOwner2, DummyOwner3, DummyOwner4, IcRetry } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {
  const [campaigns, setCampaigns] = useState([])
  const [campaigns2, setCampaigns2] = useState([])
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  useEffect(() => {
    getCampaigns()
    getCampaigns2()
  }, [])

  const getCampaigns = async () => {
    await setCampaigns([])
    setLoading(true)
    await axios({
      url: `${linkApi}/campaign/cat/1`,
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
  const getCampaigns2 = async () => {
    await setCampaigns2([])
    setLoading2(true)
    await axios({
      url: `${linkApi}/campaign/cat/2`,
      method: 'GET',
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

  const navigation = useNavigation()
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <MainHeader title={"Find Campaigns"} onPress={() => navigation.navigate('Notification')}/>
      <Gap height={24}/>
      <SearchCampaign
        onChangeText={(text) => console.log(text)}
        onPress={() => console.log('filter')}
      />
      <Gap height={16}/>
      <Adds 
        img={DummyAd1}
        addText={"Do you have a really inovative idea?"}
        btnText={"Start Campaign"}
        onPress={() => navigation.navigate('CreateCampaign')}        
      />
      <Gap height={24}/>
      <TitleCat
        mainText={"Trending Campaign"}
        subText={"Show all"}
        onPress={() => console.log('show all')}
      />
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
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trend}>
              <Gap width={24}/>
              {
                campaigns &&
                campaigns.length > 0 && (
                  campaigns.map(data => {
                    return (
                      <MidItem
                        key={data.id}
                        img={{ uri: data.image }}
                        title={data.title}
                        owner={data?.user?.name}
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
              <Gap width={12}/>
            </ScrollView>
          </>
        )
      }
      <TitleDesc
        title={"Join People's Campaigns"}
        subtitle={"Join other's campaigns to help them for better future."}
      />
      <Gap height={12}/>
      <View style={styles.people}>
        <PeopleCampaigns
          img={DummyOwner1}
          name={"Taylor O Neil"}
          job={"Engineer"}
          campaign={"Orphans Home Fund"}
          total={100000000}
        />
        <PeopleCampaigns
          img={DummyOwner2}
          name={"Mithcell Khan"}
          job={"Manager"}
          campaign={"Software House"}
          total={120000000}
        />
      </View>
      <Gap height={16}/>
      <View style={styles.people}>
        <PeopleCampaigns
          img={DummyOwner3}
          name={"Marcuz Mars"}
          job={"Marketing"}
          campaign={"Bazzar for Jobless"}
          total={550000000}
        />
        <PeopleCampaigns
          img={DummyOwner4}
          name={"Steven Chow"}
          job={"Manager"}
          campaign={"Robot Building Worker"}
          total={250000000}
        />
      </View>
      <Gap height={24}/>
      <Adds
        img={DummyAd2}
        addText={"Help homeless by donate some?"}
        btnText={"Start Donating"}
        onPress={() => console.log('ada')}
      />
      <Gap height={24}/>
      <TitleCat
        mainText={"Popular Campaign"}
        subText={"Show all"}
        onPress={() => console.log('pressed')}
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
          campaigns2.length > 0 && (
            campaigns2.map(data => {
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

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
  },
  people: {
    flexDirection: 'row',
    marginHorizontal: 24,
    justifyContent: 'space-between',
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