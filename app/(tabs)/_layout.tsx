import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

const TabIcon = ({ focused, icon, title}: any) => {
    if (focused){
    return (
        <ImageBackground 
            source={images.highlight}
            className='flex flex-row flex-1 w-full min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
            >
            <Image source={icon} tintColor='#151312' className="size-5"></Image>
            <Text className="text-secondary ml-2 font-semibold text-base">{title}</Text>
        </ImageBackground>
       )
    }

    return(
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor={"#A8B5D"} className="size-5" />
        </View>
    )
}

const _layout = () => {
  return (
   <Tabs
        screenOptions={{ 
            tabBarShowLabel: false,
            tabBarItemStyle:{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            },
            tabBarStyle:{
                backgroundColor: "#0f0D23",
                borderRadius: 50,
                marginHorizontal: 10,
                marginBottom:36,
                height:52,
                position: "absolute",
                overflow: "hidden",
                borderColor: "0f0fD23",
                // borderWidth: 1
            }
         }}
   >
        <Tabs.Screen
            name='index'
            options={{ 
                title: 'Home',
                headerShown: false, 
                tabBarIcon: ({ focused }) => (
                   <TabIcon 
                    focused= {focused}
                    icon={icons.play}
                    title="Home"
                   />
                )
            }}
        />
        <Tabs.Screen
            name='search'
            options={{ 
                title: 'Search',
                headerShown: false ,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                     focused= {focused}
                     icon={icons.
                        search
                     }
                     title="Search"
                    />
                 )
            }}
        />
        <Tabs.Screen
            name='saved'
            options={{ 
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                     focused= {focused}
                     icon={icons.save}
                     title="Save"
                    />
                 )
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{ 
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                     focused= {focused}
                     icon={icons.person}
                     title="Profile"
                    />
                 )
            }}
        />
   </Tabs>
  )
}

export default _layout