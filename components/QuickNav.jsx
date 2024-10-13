import { View, TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export const QuickNav = ({ title, icon, route, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(route)}
      activeOpacity={0.7}
      className={`bg-[#262626] rounded-lg min-h-[60px] min-w-[150px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
      >
        <View className="flex-row justify-center items-center space-x-2">
            <Image
                source={icon}
                className="h-6 w-6"
                tintColor="#fdfbd4"
            />
            <Text className={`text-text font-semibold text-sm ${textStyles}`}>
                {title}
            </Text>
      </View>
    </TouchableOpacity>
  )
}

export default QuickNav