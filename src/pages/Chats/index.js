import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { customColors, customFonts } from '../../utils'
import { ChatItems, Gap, MainHeader, OnlineItem, Toggle } from '../../components'
import { DummyGroup1, DummyGroup2, DummyGroup3, DummyUser1, DummyUser2, DummyUser3, DummyUser4, DummyUser5, DummyUser6, DummyUser7, IcSearchPurp } from '../../assets'
import { useNavigation } from '@react-navigation/native'

const Chats = () => {
  const navigation = useNavigation()
  const RenderChats = () => {
    return (
      <View>
        <ChatItems
          img={DummyUser6}
          name={"James Curt"}
          msg={"I saw it clearly and might be going to"}
          time={"12.30"}
          onPress={() => navigation.navigate('ChatPage', {
            type: 'normal',
            name: 'James Curt',
            image: DummyUser6
          })}
        />
        <ChatItems
          img={DummyUser4}
          name={"Rosalie Emily"}
          msg={"Did you know how to get the campaign"}
          onPress={() => navigation.navigate('ChatPage', {
            type: 'normal',
            name: 'Rosalie Emily',
            image: DummyUser4
          })}
          time={"7:30"}
          notif={"2"}
        />
        <ChatItems
          img={DummyUser2}
          name={"Anna Joeson"}
          msg={"Do you wanna hang out or something?"}
          onPress={() => navigation.navigate('ChatPage', {
            type: 'normal',
            name: 'Anna Joeson',
            image: DummyUser2
          })}
          time={"21:30"}
          notif={"5"}
        />
        <ChatItems
          img={DummyUser7}
          name={"Justin Anderson"}
          msg={"Nobody's gonna know until we found it"}
          onPress={() => navigation.navigate('ChatPage', {
            type: 'normal',
            name: 'Justin Anderson',
            image: DummyUser7
          })}
          time={"4:30"}
        />
        <ChatItems
          img={DummyUser3}
          name={"Angela Claire"}
          msg={"Why don’t you come to my houuse this..."}
          onPress={() => navigation.navigate('ChatPage', {
            type: 'normal',
            name: 'Angela Claire',
            image: DummyUser3
          })}
          time={"11:25"}
          notif={"3"}
        />
      </View>
    )
  }

  const RenderGroups = () => {
    return (
      <View>
        <ChatItems
          onPress={() => navigation.navigate('GroupChat',{ 
            title: 'Homeless Fundraise'
          })}
          member={"You"}
          img={DummyGroup1}
          name={"Homeless Fundraise"}
          msg={"Let’s talk about this guys, come on"}
          time={"15:00"}
        />
        <ChatItems
          onPress={() => navigation.navigate('GroupChat',{ 
            title: 'Future AI Human Robots'
          })}
          member={"John"}
          img={DummyGroup2}
          name={"Future AI Human Robots"}
          msg={"Why don’t we just start to discuss"}
          time={"4:25"}
          notif={"11"}
        />
        <ChatItems
          onPress={() => navigation.navigate('GroupChat',{ 
            title: 'Future Hybrid Drone'
          })}
          member={"Chris"}
          img={DummyGroup3}
          name={"Future Hybrid Drone"}
          msg={"We need to discuss about this"}
          time={"9:45"}
          notif={"7"}
        />
      </View>
    )
  }

  const [currentToggle, setCurrentToggle] = useState('left')
  return (
    <ScrollView style={styles.container}>
      <MainHeader title={"Your Resent Chats"}/>
      <Gap height={16}/>
      <View style={styles.searchbox}>
        <TextInput style={styles.input} placeholder={"Search Chats"}/>
        <IcSearchPurp/>
      </View>
      <Text style={styles.title}>Active</Text>
      <Gap height={12}/>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Gap width={24}/>
        <OnlineItem
          img={DummyUser1}
        />
        <OnlineItem
          img={DummyUser2}
        />
        <OnlineItem
          img={DummyUser3}
        />
        <OnlineItem
          img={DummyUser4}
        />
        <OnlineItem
          img={DummyUser5}
        />
        <OnlineItem
          img={DummyUser6}
        />
        <OnlineItem
          img={DummyUser7}
        />
        <Gap width={24}/>
      </ScrollView>
      <Text style={styles.sectitle}>Messages</Text>
      <Gap height={12}/>
      <Toggle
        left={"Recent"}
        right={"Group"}
        current={currentToggle}
        leftPress={() => setCurrentToggle('left')}
        rightPress={() => setCurrentToggle('right')}
      />
      <Gap height={24}/>
      {
        currentToggle === 'left' ?
        <RenderChats/>
        : <RenderGroups/>
      }
      <Gap height={120}/>
    </ScrollView>
  )
}

export default Chats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white
  },
  searchbox: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: customColors.white,
    elevation: 3,
    marginHorizontal: 24,
    paddingHorizontal: 14,
    borderRadius: 8
  },
  input: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: customFonts.semiBold,
    color: customColors.text.primary,
    marginTop : 24,
    marginLeft: 24
  },
  sectitle: {
    fontSize: 18,
    fontFamily: customFonts.semiBold,
    color: customColors.text.primary,
    marginTop : 24,
    marginLeft: 24
  }
})