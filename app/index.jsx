import { View, Image, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import ResTex from '../components/ResTex'

import { icons, images } from '../constants'
import { CustomButton } from '../components/CustomButton'
import { Redirect, router } from 'expo-router'

import { useGlobalContext } from '../context/GlobalProvider'
import { getCurrentUser, signInAsDemoUser, createDemoUser, deleteSessions } from '../lib/appwrite'


export default function App() {
    const { setUser, setIsLoggedIn, isLoading, isLoggedIn } = useGlobalContext();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    if (!isLoading && isLoggedIn) return <Redirect href="/home"/>


    const loginTestUser = async () => {
        setIsLoggingIn(true);

        try {
            try {
                await signInAsDemoUser();
            }
            catch {
                try {
                    //deleteSessions();
                    await signInAsDemoUser();
                }
                catch (error)
                {
                    console.log(error);
                }
            }
            
            const user = await getCurrentUser();
            setUser(user);
            setIsLoggedIn(true);

            router.replace('/home');
        } catch (error)
        {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoggingIn(false);
        }
    }

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center mt-[120px]">
            <Image
                source={images.logo_small}
                className="w-[120px] h-[120px]"
                resizeMode='contain'
            />

            <Text className="text-text text-3xl font-bold mt-10">
                Welcome to {''}
                <Text className="text-primary">
                    Resonance
                </Text>
            </Text>

            { isLoading ? (
                <Image
                    source={images.loading_gif}
                    className="w-10 h-10 mt-32"
                    resizeMode='contain'
                />
            ): (
                <Image
                    source={images.transparent_square}
                    className="w-10 h-10 mt-32"
                    resizeMode='contain'
                />
            )}
            

            <Text className="text-primary text-base font-bold mt-[150px]">
                DISCOVER {''}
                <Text className="text-text">
                    YOUR SOUND.
                </Text>
            </Text>

            <Text className="text-primary text-base font-bold">
                CONNECT {''}
                <Text className="text-text">
                    WITH OTHERS.
                </Text>
            </Text>

            <CustomButton
                title="Check Out the Demo"
                textStyles=""
                handlePress={loginTestUser}
                containerStyles="px-[35px] mt-10"
                isLoading={isLoggingIn}
                rightImage={icons.login}
            />
            
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}