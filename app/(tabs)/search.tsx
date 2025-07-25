import MovieCard from '@/compenents/MovieCard'
import SearchBar from '@/compenents/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images'
import { fetchMovies } from '@/service/api';
import { updateSearchCount } from '@/service/appwrite';
import useFetch from '@/service/useFetch';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator,  } from 'react-native'


const search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const {
      data:movies, 
      loading, 
      error,
      refetch: loadMovies,
      reset
    } = useFetch(() => fetchMovies(
      {query: searchQuery}
    ), false)

    useEffect(() => {
      const timeoutId = setTimeout( async() => {
        if(searchQuery.trim()){
          await loadMovies();
        }else{
          reset()
        }
      }, 500)

      return() => clearTimeout(timeoutId);
    },[searchQuery])

      useEffect(() => {
            if(movies?.length > 0 && movies?.[0]){
            updateSearchCount(searchQuery, movies[0]);
            }
      },[movies])

  return (
    <View className='flex-1 bg-primary' >
       <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>

       <FlatList 
       data={movies}
       renderItem={({ item }) => <MovieCard {...item}/> }
       keyExtractor={(item) => item.id.toString()}
       className='px-5'
       numColumns={3}
       columnWrapperStyle={{ 
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={
          {
            paddingBottom: 100
          }
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className=' mt-10- px-5'>
               <Text className='text-center text-gray-500'>
                  {searchQuery.trim() ? "No movies found" : "Search for a movie"}
               </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center'>
                <Image source={icons.logo} className='w-12 h-10'/>
            </View>

            <View className='my-5'>
              <SearchBar placeholder='Search movies...'
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator size={'large'} color="#0000ff" className='my-3'/>
            )}

            {error &&(
              <Text className='text-red-500 text-center my-3'>{error.message}</Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 &&(
                <Text className='text-xl text-white font-bold'>
                  Search Results for{''}
                  <Text className='text-accent'> {searchQuery}</Text>
                </Text>
              )
            }
          </>
        }
       />
    </View>
  )
}

export default search