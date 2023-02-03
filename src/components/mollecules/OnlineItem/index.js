import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { IcActive } from '../../../assets'

const OnlineItem = ({ img }) => {
  return (
    <View style={styles.container}>
        <Image source={img} style={styles.img}/>
        <View style={styles.active}>
            <IcActive/>
        </View>
    </View>
  )
}

export default OnlineItem

const styles = StyleSheet.create({
    img: {
        width: 46,
        height: 46,
        borderRadius: 50
    },
    active: {
        position: 'absolute',
        right: 3,
        bottom: 1
    },
    container: {
        marginRight: 12
    }
})