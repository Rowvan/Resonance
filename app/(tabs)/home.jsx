import { View, Text, ScrollView, Image, Modal, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import QuickNav from '../../components/QuickNav'

import { useGlobalContext } from '../../context/GlobalProvider'

import { icons } from '../../constants'
import { images } from '../../constants'

import DataDisplay from '../../components/DataDisplay'
import { getStatsBasic } from '../../lib/appwrite'

import { useAppwrite } from '../../lib/useAppwrite'
import AIResDisplay from '../../components/AIResDisplay'



const Home = () => {
  const { user, cached_aiDailyRes, setCached_aiDailyRes } = useGlobalContext();

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <View className="my-6 px-4 space-y-1 flex-row items-center">
          <View className="flex-1">
            <Text className="font-pmedium text-xl text-text">
              Welcome Back, 
            </Text>
            <Text className="text-4xl font-psemibold text-primary">
              {user.username}
            </Text>
          </View>

          <View>
            <Image
              source={images.logo}
              className="h-[90px] w-[90px]"
              resizeMode='contain'
            />
          </View>
        </View>

        <View>
    </View>

        <View className="w-full justify-center">

          <View className="flex-row justify-center">
            <QuickNav
              title="Library"
              icon={icons.library}
              route="/profile"
              containerStyles="my-3 mx-5"
            />
            <QuickNav
              title="Top Resonance"
              icon={icons.chart}
              route="/explore"
              containerStyles="my-3 mx-5"
            />
          </View>

          <View className="flex-row justify-center">
            <QuickNav
              title="Leaderboards"
              icon={icons.leaderboard}
              route="/leaderboard"
              containerStyles="my-3 mx-5"
            />

            <QuickNav
              title="Friends"
              icon={icons.friends}
              route="/friends"
              containerStyles="my-3 mx-5"
            />
          </View>

        </View>

        <View className="mt-10">
          <Text className="text-text text-2xl font-psemibold px-4">
            Your Daily Stats
          </Text>
          <View className="justify-center items-center space-y-4">
            <View className="flex-row space-x-4">
              <DataDisplay
                data='213'
                subtitle="Streams"
                viewStyles="m-4"
              />

              <DataDisplay
                data='776'
                subtitle="Minutes"
                viewStyles="m-4"
              />

              <DataDisplay
                data='All Too Well'
                title="Taylor Swift"
                subtitle="Top Song"
                viewStyles="m-4"
              />
            </View>

            <View className="flex-row space-x-4">
              <DataDisplay
                data='7'
                subtitle="Albums"
                viewStyles="m-4"
              />

              <DataDisplay
                data='3'
                subtitle="Astists"
                viewStyles="m-4"
              />

              <DataDisplay
                data='Taylor Swift'
                subtitle="Top Artist"
                viewStyles="m-4"
              />
            </View>
            
          </View>

          <Text className="text-text text-2xl font-psemibold px-4 mt-2 mb-2">
            Your Daily Resonance
          </Text>
          
          <AIResDisplay
            type="today"
            statsID={user.stats}
          />

        </View>

        <View className="mt-10">
          <Text className="text-text text-2xl font-psemibold px-4">
            Group Stats
          </Text>
          <View className="justify-center items-center space-y-4 bg-[#262626] rounded-lg w-[94%] ml-[3%] mt-[2%]">
            <View className="flex-row mt-4 items-center space-x-2">
              <Image
                source={icons.group}
                className="h-6 w-6"
                tintColor="#fdfbd4"
              />
              <Text className="text-text text-xl font-psemibold">Top Taylor Swift Users (1k)</Text>
            </View>
            <View className="flex-row space-x-4">
              <DataDisplay
                data="714,627"
                subtitle="Streams"
                viewStyles="m-4"
              />

              <DataDisplay
                data="2,595,525"
                subtitle="Minutes"
                viewStyles="m-4"
              />

              <DataDisplay
                data="22"
                subtitle="Albums"
                viewStyles="m-4"
              />
            </View>

            <View className="flex-row space-x-4">
              <DataDisplay
                data="Cruel Summer"
                subtitle="Top Song"
                viewStyles="m-4"
              />

              <DataDisplay
                data="Red"
                subtitle="Top Album"
                viewStyles="m-4"
              />
            </View>
            
          </View>

          <View className="justify-center items-center space-y-4 bg-[#262626] rounded-lg w-[94%] ml-[3%] my-[4%]">
            <View className="flex-row mt-4 items-center space-x-2">
              <Image
                source={icons.group}
                className="h-6 w-6"
                tintColor="#fdfbd4"
              />
              <Text className="text-text text-xl font-psemibold">Lizben Crew (3)</Text>
            </View>
            <View className="flex-row space-x-4">
              <DataDisplay
                data="902"
                subtitle="Streams"
                viewStyles="m-4"
              />

              <DataDisplay
                data="3,096"
                subtitle="Minutes"
                viewStyles="m-4"
              />

              <DataDisplay
                data="458"
                subtitle="Albums"
                viewStyles="m-4"
              />
            </View>

            <View className="flex-row space-x-4">
              <DataDisplay
                data="Marchin On"
                title="One Republic"
                subtitle="Top Song"
                viewStyles="m-4"
              />

              <DataDisplay
                data="Owl City"
                subtitle="Top Artist"
                viewStyles="m-4"
              />
            </View>
            
          </View>

        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default Home