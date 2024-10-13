import { View, Text, Alert, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import { getStats, getUser, getArtist } from '../lib/appwrite'
import { icons } from '../constants'


const SimpleUser = ({ userID, showStats }) => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [topArtist, setTopArtist] = useState(null);
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
            //console.log("getting user: ", userID)
          const fetchedUser = await getUser(userID);
          setUser(fetchedUser);
        
          if (showStats) {
            //console.log("getting user stats: ", fetchedUser.stats)
            const fetchedStats = await getStats(fetchedUser.stats);
            setStats(fetchedStats);

            //console.log("getting top artist: ", fetchedStats.top_artists_today[0])
            const fetchedArtist = await getArtist(fetchedStats.top_artists_today[0]);
            setTopArtist(fetchedArtist);
          }
        } catch (error) {
          Alert.alert("Error", error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [userID]);

    if (loading) return (
        <View className="rounded-xl bg-[#262626] min-h-[55px] w-[94%] ml-[3%] mt-2 flex-row">
            <View className="flex-1">
                <View className="flex-row space-x-2 justify-start items-center mt-1">
                    <Image
                        source={icons.person}
                        className="h-8 w-8 ml-1"
                        resizeMode='contain'
                        tintColor="#fdfbd4"
                    />
                    <View className="justify-center">
                        <Text className="text-xl font-psemibold text-primary">
                            Loading...
                        </Text>

                    </View>

                </View>

                { showStats ? (
                    <View className="flex-row space-x-2 justify-start items-center mt-3 mb-2">
                        <Image
                            source={icons.stats}
                            className="h-8 w-8 ml-1"
                            resizeMode='contain'
                            tintColor="#fdfbd4"
                        />
                    </View>

                ) : (
                    <View>
                    </View>
                )}
            </View>
        </View>
    );


  return (
    <View className="rounded-xl bg-[#262626] min-h-[55px] w-[94%] ml-[3%] mt-2 flex-row">
        <View className="flex-1">
            <View className="flex-row space-x-2 justify-start items-center mt-1">
                <Image
                  source={icons.person}
                  className="h-8 w-8 ml-1"
                  resizeMode='contain'
                  tintColor="#fdfbd4"
                />
                <View className="justify-center">
                    <Text className="text-xl font-psemibold text-primary">
                        {user.username}
                    </Text>

                </View>

            </View>

            { showStats ? (
                <View className="flex-row space-x-2 justify-start items-center mt-3 mb-2">
                    <Image
                    source={icons.stats}
                    className="h-8 w-8 ml-1"
                    resizeMode='contain'
                    tintColor="#fdfbd4"
                    />
                    <View className="justify-center">
                        <View className="flex-row space-x-2">
                            <Text className="text-xs font-psemibold text-primary">
                                {stats.streams_today}
                            </Text>
                            <Text className="text-xs font-psemibold text-text">
                                streams,
                            </Text>
                            <Text className="text-xs font-psemibold text-primary">
                                {stats.minutes_today}
                            </Text>
                            <Text className="text-xs font-psemibold text-text">
                                minutes
                            </Text>
                        </View>
                        <View className="flex-row space-x-2">
                            <Text className="text-xs font-psemibold text-text">
                                Top Artist:
                            </Text>
                            <Text className="text-xs font-psemibold text-primary">
                                {topArtist.name}
                            </Text>
                        </View>

                    </View>

                </View>
            ) : (
                <View>
                </View>
            )}


        </View>
        
        <TouchableOpacity
            className="flex-row space-x-2 items-center my-6 mr-2 bg-[#363636] p-2 rounded-full "
            onPress={() => {
                // remove friend
            }}
        >
            <Image
                source={icons.remove_friend}
                className="h-6 w-6"
                resizeMode='contain'
                tintColor="#e01e00"
            />
        </TouchableOpacity>
        
    </View>
  )
}

export default SimpleUser