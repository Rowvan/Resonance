import { View, Text, ScrollView, Image, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'

import { icons } from '../../constants'

import { useAppwrite } from "../../lib/useAppwrite"
import { getTopResonance } from '../../lib/appwrite'
import SearchInput from '../../components/SearchInput'
import SimpleSong from '../../components/SimpleSong'

const Explore = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch } = useAppwrite(getTopResonance);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-background h-full">
      <View>
        <Text className="font-pmedium text-base text-text my-2">
          Daily Resonant:  
        </Text>
        <View className="flex-row space-x-2 justify-center items-center mb-4">
          <Image
            source={icons.music_note}
            className="h-6 w-6"
            resizeMode='contain'
            tintColor="#fdfbd4"
          />
          <Text className="text-xl font-psemibold text-primary">
            BIRDS OF A FEATHER
          </Text>
          <Text className="text-xl font-psemibold text-text">
            By
          </Text>
          <Text className="text-xl font-psemibold text-primary">
            Billie Eilish
          </Text>
        </View>

        <SearchInput/>
        
        <View className="justify-center items-center">
          <Text className="text-text text-xl font-psemibold mt-4">
            Today's Top Resonance
          </Text>
        </View>

      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <SimpleSong
            songID={item}
            showRes={true}
          />
        )}
        ListHeaderComponent={() => {
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Explore