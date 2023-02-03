import { ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../utils'
import { Gap, StackHeader } from '../../components'
import DonatorItem from '../DonatorItem'
import { useState } from 'react'

const DonatorPage = ({ navigation, route }) => {
  const [detailData, setDetailData] = useState(route.params.data)
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StackHeader title={"All Donator"} onPress={() => navigation.goBack()}/>
      <Text style={styles.title}>All Donator</Text>
      <Gap height={24}/>
      {
        detailData.campaign_donation && (
          detailData.campaign_donation.length > 0 && (
            detailData.campaign_donation.map(data => {
              return (
                <>
                  <DonatorItem
                    img={{ uri: data.user.image }}
                    name={data.user.name}
                    job={data.user.role}
                    price={data.donation_amount}
                    desc={data.message}
                    date={`${days[new Date(data.created_at).getDay()]}, ${month[new Date(data.created_at).getMonth()]} ${new Date(data.created_at).getDate()}`}
                  />
                  <Gap height={16}/>
                </>
              )
            })
          )
        )
      }
      <Gap height={150}/>
    </ScrollView>
  )
}

export default DonatorPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white
  },
  title: {
    fontSize: 16,
    fontFamily: customFonts.semiBold,
    color: customColors.text.primary,
    marginLeft: 24,
    marginTop: 24
  }
})