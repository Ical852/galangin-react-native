import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors, customFonts } from '../../utils'
import { CollabUserItem, Gap, StackHeader } from '../../components'
import { useState } from 'react'

const CollabUserPage = ({ navigation, route }) => {
    const [detailData, setDetailData] = useState(route.params.data)
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <StackHeader
            title={"Collab Users"}
            onPress={() => navigation.goBack()}
        />
        <Gap height={24}/>
        <Text style={styles.title}>All Collab Users</Text>
        <Gap height={24}/>
        {
            detailData.collab_campaign && (
                detailData.collab_campaign.length > 0 && (
                    detailData.collab_campaign.map(data => {
                        return (
                            <>
                                <CollabUserItem
                                    img={{ uri : data.user.image }}
                                    name={data.user.name}
                                    job={data.user.role}
                                />
                                <Gap height={20}/>
                            </>
                        )
                    })
                )
            )
        }
    </ScrollView>
  )
}

export default CollabUserPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white
    },
    title: {
        fontSize: 16,
        fontFamily: customFonts.semiBold,
        color: customColors.text.primary,
        marginLeft: 24
    }
})