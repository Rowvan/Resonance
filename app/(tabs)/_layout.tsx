import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import { icons } from "../../constants"

const TabIcon = ({ icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-8 h-8"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-sx`} style={{color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#E73700',
          tabBarInactiveTintColor: '#fdfbd4',
          tabBarStyle: {
            backgroundColor: "#272727",
            borderTopWidth: 2,
            borderTopColor: "#2a2a2a",
            height: 70
          },
          tabBarHideOnKeyboard: true
        }}
      >
        <Tabs.Screen
          name = "home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name = "explore"
          options={{
            title: 'Explore',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.explore}
                color={color}
                name="Explore"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name = "friends"
          options={{
            title: 'Friends',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.friends}
                color={color}
                name="Friends"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name = "profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.account_circle}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout