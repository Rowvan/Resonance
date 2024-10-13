import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { icons } from "../constants"

import { usePathname, router } from 'expo-router'

const SearchInput = ({ initialQuery }) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '')

  return (
    <View className="border-2 border-black-200 w-[94%] ml-[3%] h-16 px-4 bg-black-100 rounded-2xl focus:border-primary focus:bg-[#2E2218] items-center flex-row space-x-4">
        <TextInput
            className="text-base mt-0.5 text-secondary flex-1 font-pregular"
            value={query}
            placeholder="Search"
            placeholderTextColor="#fdfbd4"
            onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
            onPress={() => {
                if (!query) {
                    return Alert.alert("Missing Query", "Please input something to search results across database")
                }

                // console.log("Query 1: ", query)

                if (pathname.startsWith("/search")) router.setParams({ query })
                else router.push(`/search/${query}`)
            }}
            className="bg-[#262626] p-2 rounded-full"
        >
            <Image
                source={icons.search}
                className="w-6 h-6"
                resizeMode='contain'
                tintColor="#fdfbd4"
            />
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput