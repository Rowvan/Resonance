import { View, Text } from 'react-native'
import React from 'react'

const DataDisplay = ({ data, title, subtitle, viewStyles, textStyles }) => {
  return (
    <View className={`flex-col justify-center items-center ${viewStyles}`}>
      <Text className="text-primary font-pbold text-2xl ">{data}</Text>
      <Text className={`text-text font-pregular text-xs ${textStyles}`}>{title}</Text>
      <Text className={`text-text font-psemibold text-base ${textStyles}`}>{subtitle}</Text>
    </View>
  )
}

export default DataDisplay