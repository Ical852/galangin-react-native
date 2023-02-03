import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IcFilter, IcSearch } from '../../../assets'
import { customColors } from '../../../utils'
import LinearGradient from 'react-native-linear-gradient'

const SearchCampaign = ({ onChangeText, onPress }) => {
  return (
    <View style={styles.container}>
        <View style={styles.searchBox}>
            <IcSearch/>
            <TextInput 
                style={styles.input} 
                placeholder={"Search Campaigns"}
                onChangeText={onChangeText}
            />
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            <LinearGradient 
                colors={[customColors.gradient.sec, customColors.gradient.main]}
                style={styles.filterBox}>
                <IcFilter/>
            </LinearGradient>
        </TouchableOpacity>
    </View>
  )
}

export default SearchCampaign

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        flexDirection: 'row'
    },
    searchBox: {
        backgroundColor: customColors.white,
        elevation: 3,
        height :48,
        flex: 1,
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        borderRadius: 8
    },
    filterBox: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    input: {
        flex: 1,
        marginLeft: 12
    }
})