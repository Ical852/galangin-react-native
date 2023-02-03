import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../../utils'

const CollabUserItem = ({ img, name, job }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userdata}>
        <Image source={img} style={styles.img} />
        <View style={styles.data}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.job}>{job}</Text>
        </View>
      </View>
      <View style={styles.line}/>
    </View>
  )
}

export default CollabUserItem

const styles = StyleSheet.create({
  container: {
    height: 71,
    marginHorizontal: 24,
    backgroundColor: customColors.white
  },
  line: {
    height: 1,
    backgroundColor: customColors.def.greyL,
    marginTop: 20
  },
  img: {
    height: 46,
    width: 46,
    borderRadius: 50
  },
  userdata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: customFonts.medium,
    color: customColors.text.primary
  },
  data: {
    marginLeft: 12
  },
  job: {
    fontSize: 14,
    fontFamily: customFonts.light,
    color: customColors.text.secondary
  }
})