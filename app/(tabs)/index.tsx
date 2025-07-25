import MovieCard from "@/compenents/MovieCard";
import SearchBar from "@/compenents/SearchBar";
// import TrendingCard from "@/compenents/TrendingCard";
import TrendingCard from "@/compenents/trendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/service/api";
import { getTrendingMovies } from "@/service/appwrite";
import useFetch from "@/service/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, View, Text, FlatList } from "react-native";



export default function Index() {

    const router = useRouter();

    const{
      data: trendingMovies,
      loading: trendingLoading,
      error: trendingError
    } = useFetch(getTrendingMovies);

    const {
      data:movies, 
      loading: moviesLoading, 
      error: moviesError
    } = useFetch(() => fetchMovies(
      {query: ""}
    ))

  return (
    <View
     className="flex-1 bg-primary"
    >
      <Image source={images.bg} className="absolute z-0 w-full"/>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ 
        minHeight: "100%", paddingBottom: 10
       }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto mb-5"/>

          {moviesLoading || trendingLoading ? (
            <ActivityIndicator 
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
            />
          ) : moviesError || trendingError ? (
            <Text>Error: {moviesError?.message || trendingError?.message}</Text>
          ) : <View className="flex-1 mt-5">
                <SearchBar 
                  onPress={()=> router.push("/search")}
                  placeholder= "Search a movie"
                />
                {trendingMovies && (
                  <View className="mt-10 ">
                    <Text className="text-lg font-bold text-white mt-5 mb-3">Trending Movies</Text>
                  </View>
                )}
                <>
                  <FlatList 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4"/>}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                   <TrendingCard movie={item} index={index}/>
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  />
                  <Text className="text-lg font-bold text-white mt-5 mb-3">Latest Movies</Text>
                  <FlatList 
                  data={movies}
                  renderItem={({item}) => (
                  <MovieCard 
                    {...item}
                  />
                  )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle = {{ 
                      justifyContent: 'flex-start',
                      gap: 20,
                      paddingRight: 20,
                      marginBottom: 5
                     }}
                     className="mt-2 pb-32"
                     scrollEnabled={false}
                  />
                </>
             </View>
          }

          
      </ScrollView>
    </View>
  );
}
