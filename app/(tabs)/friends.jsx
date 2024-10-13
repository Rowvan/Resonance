import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SimpleUser from '../../components/SimpleUser'
import { useGlobalContext } from '../../context/GlobalProvider'

const Friends = () => {
  const { user, setUser } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [isFLEmpty, setIsFLEmpty] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 400));
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <FlatList
        data={user.friends}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <SimpleUser
            userID={item}
            showStats={true}
          />
        )}
        ListHeaderComponent={() => {return (
          <View className="justify-center items-center">
            <Text className="text-text text-xl font-psemibold mt-4">
              Your Friends
            </Text>
          </View>
        )}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        ListEmptyComponent={() => { setIsFLEmpty(true); return(
          <View className="justify-center items-center">
            <Text className="text-text mt-4 text-base font-psemibold">
              Your friends list is EMPTY!
            </Text>
          </View>
        )}}
      />
    </SafeAreaView>
  )
}

export default Friends