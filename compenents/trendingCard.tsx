import { View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images';


const TrendingCard = ({ movie: {movie_id, title, poster_url}, index}: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
        <TouchableOpacity className='w-32 relative pl-5'>
            <Image 
            source={{  uri: poster_url  }}
            className='w-full h-48 rounded-lg'
            resizeMode='cover'/>
            <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
                <MaskedView maskElement={
                    <Text className='font-bold text-white text-6xl'>{index +1}</Text>
                }>
                    <Image className='size-16 ' resizeMode='cover' source={images.rankingGradient}/>
                </MaskedView>
            </View>
             <Text className='text-sm text-light-200 font-bold mt-2'numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard