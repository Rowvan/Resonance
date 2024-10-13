import { TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'

export const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, rightImage }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
      >
        <View className="flex-row space-x-4">
          <Text className={`text-background font-semibold text-lg ${textStyles}`}>
            {title}
          </Text>

          <Image
            source={rightImage}
            className="w-8 h-8"
            resizeMode='contain'
            tintColor="#fdfbd4'"
          />

        </View>
      
    </TouchableOpacity>
  )
}

export default CustomButton