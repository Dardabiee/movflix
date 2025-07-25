import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

interface Props{
  placeholder: string;
  onPress?: ()=> void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({placeholder, onPress, value, onChangeText}: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-2'>
       <Image source={icons.search} className='w-5 h-5' resizeMode='contain' tintColor= "#ab8bff"/>
       <TextInput 
       placeholder={placeholder}
       onPress={onPress}
       onChangeText={onChangeText}
       value={value}
       placeholderTextColor="#a8b5db"
       className='flex-1 ml-2 text-white'
       />
    </View>
  )
}

export default SearchBar