import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { customColors } from '../../../utils'
import { IcSend, IcSendActive } from '../../../assets'

const TextInputSend = ({ onSend, autoFocus, onChangeText, placeholder, value }) => {
    const [focus, setFocus] = useState('')

  return (
    <View style={styles.container}>
        <View style={styles.input}>
            <TextInput
                value={value}
                placeholder={placeholder} 
                onFocus={() => setFocus(true)}
                onSubmitEditing={() => setFocus(false)}
                onEndEditing={() => setFocus(false)}
                onChangeText={onChangeText} 
                autoFocus={autoFocus} 
            />
        </View>
        <TouchableOpacity style={styles.btnSend(focus)} onPress={onSend}>
            {
                focus ? <IcSendActive/> : <IcSend/>
            }
        </TouchableOpacity>
    </View>
  )
}

export default TextInputSend

const styles = StyleSheet.create({
    container : {
        height: 45,
        flexDirection: 'row'
    },
    btnSend: (focus) => ({
        height: 45,
        width: 45,
        backgroundColor: focus ? customColors.primary : customColors.def.greyL,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }),
    input: {
        height: 45,
        backgroundColor: customColors.def.greyL,
        width: Dimensions.get('window').width - 48 - 45 - 10,
        marginRight: 10,
        borderRadius: 10,
        paddingHorizontal: 14
    }
})