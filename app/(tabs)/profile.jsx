import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from '../../context/GlobalProvider'
import { signOut, getDailyDataStr } from "../../lib/appwrite"
import { useAppwrite } from '../../lib/useAppwrite'

import { icons } from '../../constants'

import DataDisplay from '../../components/DataDisplay'

import AIResDisplay from '../../components/AIResDisplay'

import { router } from 'expo-router'

import { getDailyRes } from '../../lib/openAI'



const Profile = () => {
  const { user, setUser } = useGlobalContext();

  // const open_ai_response = useAppwrite( async () => getDailyRes("670bb743001f82e4e621") );
  
  const logout = async () => {
    await signOut();
    
    router.replace('/index');
    setUser(null);
    setIsLoggedIn(false);
  }

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <View className="my-6 px-4 flex-row items-center justify-start">
          <View className="flex-1 flex-row items-center space-x-2 space-y-2">
            <Image
              source={icons.account_circle}
              className="h-12 w-12"
              tintColor="#fdfbd4"
            />
            <Text className="text-4xl font-psemibold text-primary">
              {user.username}
            </Text>
          </View>
          <TouchableOpacity
            className="flex-row space-x-2 items-center my-5 mr-2 bg-[#363636] p-2 rounded-full "
            onPress={() => {
                logout()
            }}
          >
            <Image
                source={icons.logout}
                className="h-6 w-6"
                resizeMode='contain'
                tintColor='#e01e00'
            />
          </TouchableOpacity>
        </View>

        <View className="mt-10">
          <Text className="text-text text-2xl font-psemibold px-4">
            All Time Stats
          </Text>
          <View className="justify-center items-center space-y-4">
            <View className="flex-row space-x-4">
              <DataDisplay
                data="412,023"
                subtitle="Streams"
                viewStyles="m-4"
              />

              <DataDisplay
                data="9,284,920"
                subtitle="Minutes"
                viewStyles="m-4"
              />

            </View>

            <View className="flex-row space-x-4">
              <DataDisplay
                data="Demons"
                title="Imagine Dragons"
                subtitle="Top Song"
                viewStyles="m-4"
              />

              <DataDisplay
                data="Imagine Dragons"
                subtitle="Top Artist"
                viewStyles="m-4"
              />
            </View>
            
          </View>

          <Text className="text-text text-2xl font-psemibold px-4 mt-2 mb-2">
            Overall Resonance
          </Text>

          <AIResDisplay
            type="total"
            statsID={user.stats}
          />

        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile