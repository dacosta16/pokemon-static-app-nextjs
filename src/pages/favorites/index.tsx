import Layout from '@/components/layouts/Layout';
import NoFavorites from '@/components/ui/NoFavorites';
import { useState, useEffect } from 'react';
import { localFavorite } from '@/utils';
import FavoritePokemons from '@/components/pokemon/FavoritePokemons';

const FavoritePage = () => {

  const [favoritePokemon, setFavoritePokemon] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemon( localFavorite.pokemons() );
  }, [])
  

  return (
    <Layout title='Favorites'>

      {
        favoritePokemon.length === 0
          ? <NoFavorites />
          : ( <FavoritePokemons pokemons={ favoritePokemon } /> )
      }
      
      
    </Layout>
  )
}

export default FavoritePage;
