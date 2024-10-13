import { View, Text, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import { getAlbum, getArtist, getSong, getResonance } from '../lib/appwrite'
import { icons } from '../constants'


const SimpleSong = ({ songID, showRes }) => {
    const [song, setSong] = useState(null);
    const [resonance, setResonance] = useState(null);
    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedSong = await getSong(songID);
          setSong(fetchedSong);
        
          if (showRes) {
            const fetchedRes = await getResonance(fetchedSong.resonance);
            setResonance(fetchedRes);
          }
          
          const fetchedAlbum = await getAlbum(fetchedSong.albums[0]);
          setAlbum(fetchedAlbum);
  
          const fetchedArtist = await getArtist(fetchedSong.artists[0]);
          setArtist(fetchedArtist);
        } catch (error) {
          Alert.alert("Error", error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [songID]);

    if (loading) return (
        <View className="rounded-xl bg-[#262626] min-h-[55px] w-[94%] ml-[3%] items-start mt-2">
            <View className="flex-row space-x-2 justify-start items-center mt-2.5 mb-2.5">
                <Image
                  source={icons.music_note}
                  className="h-8 w-8 ml-1"
                  resizeMode='contain'
                  tintColor="#fdfbd4"
                />
                <Text className="text-text">
                    Loading...
                </Text>
            </View>
            { showRes ? (
                <View className="flex-row space-x-2 justify-start items-center mt-2 mb-2">
                    <Image
                    source={icons.notes}
                    className="h-6 w-6 ml-2"
                    resizeMode='contain'
                    tintColor="#fdfbd4"
                    />
                    <View className="justify-center">
                        <View className="flex-row space-x-2">
                            <Text className="text-xs font-psemibold text-text">
                            
                            </Text>
                        </View>

                    </View>
                
                </View>
            ) : (
                <View>
                </View>
            )}
        </View>
    );


  return (
    <View className="rounded-xl bg-[#262626] min-h-[55px] w-[94%] ml-[3%] items-start mt-2">
        <View className="flex-row space-x-2 justify-start items-center mt-1">
            <Image
              source={icons.music_note}
              className="h-8 w-8 ml-1"
              resizeMode='contain'
              tintColor="#fdfbd4"
            />
            <View className="justify-center">
                <Text className="text-xl font-psemibold text-primary">
                    {song.name}
                </Text>
                <View className="flex-row space-x-2">
                    <Text className="text-xs font-psemibold text-text">
                      by
                    </Text>
                    <Text className="text-xs font-psemibold text-primary">
                      {artist.name}
                    </Text>
                    <Text className="text-xs font-psemibold text-text">
                      from
                    </Text>
                    <Text className="text-xs font-psemibold text-primary">
                      {album.name}
                    </Text>
                </View>

            </View>
            
        </View>

        { showRes ? (
            <View className="flex-row space-x-2 justify-start items-center mt-3 mb-2">
                <Image
                source={icons.notes}
                className="h-6 w-6 ml-2"
                resizeMode='contain'
                tintColor="#fdfbd4"
                />
                <View className="justify-center">
                    <View className="flex-row space-x-2">
                        <Text className="text-xs font-psemibold text-text ml-1">
                        {resonance.resonance_str}
                        </Text>
                    </View>

                </View>
                
            </View>
        ) : (
            <View>
            </View>
        )}

        
        
    </View>
  )
}

export default SimpleSong