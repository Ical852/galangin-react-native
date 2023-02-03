import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CampaignDetail, CampaignNewsDetail, ChangePassword, ChatPage, CollabUserPage, CreateCampaign, CreateCampaignSuccess, DonateSuccess, DonatorPage, EditProfile, Forgot, GrouopChatPage, MainPage, MyCampaignDetail, NotificationPage, Payment, Sended, SignIn, SignUp, SignUpSuccess, Splash, TransactionsPage } from '../pages'

const Stack = createNativeStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name='Splash' component={Splash}/>
        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='Forgot' component={Forgot}/>
        <Stack.Screen name='Sended' component={Sended}/>
        <Stack.Screen name='SignUpSuccess' component={SignUpSuccess}/>
        <Stack.Screen name='Main' component={MainPage}/>
        <Stack.Screen name='CreateCampaign' component={CreateCampaign}/>
        <Stack.Screen name='CampaignDetail' component={CampaignDetail}/>
        <Stack.Screen name='MyCampaignDetail' component={MyCampaignDetail}/>
        <Stack.Screen name='CreateCampaignSuccess' component={CreateCampaignSuccess}/>
        <Stack.Screen name='CampaignNewsDetail' component={CampaignNewsDetail}/>
        <Stack.Screen name='ChatPage' component={ChatPage}/>
        <Stack.Screen name='Payment' component={Payment}/>
        <Stack.Screen name='DonateSuccess' component={DonateSuccess}/>
        <Stack.Screen name='GroupChat' component={GrouopChatPage}/>
        <Stack.Screen name='Notification' component={NotificationPage}/>
        <Stack.Screen name='Transaction' component={TransactionsPage}/>
        <Stack.Screen name='EditProfile' component={EditProfile}/>
        <Stack.Screen name='ChangePassword' component={ChangePassword}/>
        <Stack.Screen name='DonatorPage' component={DonatorPage}/>
        <Stack.Screen name='CollabUserPage' component={CollabUserPage}/>
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})