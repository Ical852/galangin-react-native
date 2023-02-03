import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { customColors, customFonts } from '../../../utils'
import { IcCaution, IcDate } from '../../../assets'

const CustomInput = ({ placeholder, title, onChangeText, secure, date, donate, value, autoFocus, error, errors, keyboardType, datePick }) => {
    const [focus, setFocus] = useState(false)
  return (
    <>
      <View>
        <Text style={styles.title}>{title}</Text>
        <TextInput 
          style={styles.input(focus, donate, error)} 
          onFocus={() => setFocus(true)}
          onSubmitEditing={() => setFocus(false)}
          onEndEditing={() => setFocus(false)}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          value={value}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
        />
        {
          date &&
          <TouchableOpacity style={styles.dateinput} onPress={datePick}>
            <IcDate/>
          </TouchableOpacity>
        }
      </View>
      {
        error && (
          <View style={{ marginTop: 4, width: '100%' }}>
            {
              errors.map((data, i) => {
                return (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 4 }}>
                    <IcCaution/>
                    <Text style={styles.error}>{data}</Text>
                  </View>
                )
              })
            }
          </View>
        )
      }
    </>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    input: (focus, donate, error) => ({
        borderColor: focus ? customColors.primary : donate ? customColors.text.primary : error ? customColors.def.red : customColors.secondary,
        borderWidth: 1,
        paddingHorizontal: 22,
        marginTop: 6,
        borderRadius: 8
    }),
    title: {
        fontSize: 14,
        fontFamily: customFonts.regular,
        color: customColors.text.primary
    },
    dateinput: {
      position: 'absolute',
      bottom: 14,
      right: 14
    },
    error: {
      marginLeft: 4,
      fontSize: 14,
      color: customColors.def.red
    }
})