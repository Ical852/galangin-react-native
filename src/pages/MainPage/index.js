import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { customColors, customFonts, linkApi } from '../../utils'
import { NavItem } from '../../components'
import LinearGradient from 'react-native-linear-gradient'
import { IcCreateCampaign } from '../../assets'
import { Home, Explore, Chats, Profile } from '../../pages'
import { useEffect } from 'react'
import axios from 'axios'

const MainPage = ({navigation}) => {
    const [page, setPage] = useState('home')

    useEffect(() => {
        axios.get(`${linkApi}/donation/user/${global.user.id}`)
        .then(res => {
            countDonation(res.data.data)
        })
        .catch(err => {
            console.log(err.response);
        })
    }, [])

    const countDonation = (data) => {
        let donated = 0
        data.map(data => {
            donated += data.donation_amount
        })

        global.donated = donated
    }

    const RenderPage = () => {
        return page === 'home' ? <Home/> 
            : page === 'explore' ? <Explore/> 
            : page === 'chats' ? <Chats/> : <Profile/>
    }

    const CreateButton = () => {
        return (
            <TouchableOpacity style={styles.crtBtnC} activeOpacity={0.7} onPress={() => navigation.navigate('CreateCampaign')}>
                <LinearGradient 
                    colors={[customColors.gradient.sec, customColors.gradient.main]}
                    style={styles.crtBtn}>
                    <IcCreateCampaign/>
                    <Text style={styles.crttext}>Up+</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    const BottomNavigator = () => {
        return (
            <View style={styles.bottomNav}>
                <NavItem
                    active={page === 'home'}
                    icon={"home"}
                    title={"Home"}
                    onPress={() => setPage('home')}
                />
                <NavItem
                    active={page === 'explore'}
                    icon={"explore"}
                    title={"Explore"}
                    onPress={() => setPage('explore')}
                />
                <NavItem/>
                <NavItem/>
                <NavItem
                    active={page === 'chats'}
                    icon={"chat"}
                    title={"Chats"}
                    onPress={() => setPage('chats')}
                />
                <NavItem
                    active={page === 'profile'}
                    icon={"profile"}
                    title={"Profile"}
                    onPress={() => setPage('profile')}
                />
            </View>
        )
    }

  return (
    <View style={styles.container}>
        <RenderPage/>
        <BottomNavigator/>
        <CreateButton/>
    </View>
  )
}

export default MainPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        height: 70,
        backgroundColor: customColors.white,
        width: '100%',
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    crtBtn: {
        height: 80,
        width: 80,
        position: 'absolute',
        bottom: 0,
        left: Dimensions.get('window').width / 2 - 40,
        marginBottom: 8,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    crttext : {
        fontSize: 14,
        fontFamily: customFonts.semiBold,
        color: customColors.white,
        marginTop: 4,
        marginBottom: -12
    },
    crtBtnC : {
        position: 'absolute',
        bottom: 0,
    }
})