import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Image, Text } from 'react-native';


export default function App () {

  const [pokemons, setPokemons] = useState ([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then( response => response.json())
    .then (data => {
      setPokemons(data.results)
    })
  }, [])

  return (
    <SafeAreaView>
      <FlatList 
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.name}
        contentContainerStyle={{ flexGrow: 1}}
        renderItem={pokemonShow}
      />
    </SafeAreaView>
  )
}

function pokemonShow (pokemon) {

   const {name, url } = pokemon.item;

   const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
  
   const imgUrl = 'https://pokeres.bastionbot.org/images/pokemon/'+pokemonNumber+'.png';

  return(
    <View style={{ flexDirection:'row', justifyContent:'space-around', marginTop: 30, backgroundColor: '#edc', height:70, width: '100%' }}>
      <Text style={{ textAlignVertical: 'center', alignItems:'center', justifyContent:'center'}}>{pokemonNumber}</Text>      
      <Text style={{ textAlignVertical: 'center'}}>{name}</Text>
      <Image style={{width: 50, height:50, marginTop: 10}} source={{ uri: imgUrl}} />
    </View>
  )
}