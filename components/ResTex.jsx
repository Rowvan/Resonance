import { View, Text } from 'react-native'
import React from 'react'

const ResTex = ({ viewStyles, textStyles, text }) => {
  return (
    <View className={viewStyles}>
      <Text className={`text-text font-semibold ${textStyles}`}>{text}</Text>
    </View>
  )
}

export default ResTex