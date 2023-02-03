import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { NumericFormat } from 'react-number-format'

const NumberFormatter = ({number, prefix = true}) => {
  return (
    <NumericFormat
        value={number}
        thousandSeparator=","
        prefix={prefix ? 'Rp. ' : ''}
        renderText={(value) => <Text>{value}</Text>}
        displayType="text"
    />
  )
}

export default NumberFormatter

const styles = StyleSheet.create({})