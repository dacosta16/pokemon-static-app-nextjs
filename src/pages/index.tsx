import { NextPage, GetStaticProps } from 'next';

import { Grid } from '@nextui-org/react';

import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import Layout from '@/components/layouts/Layout';
import { Inter } from '@next/font/google';
import { pokeApi } from '@/api';
import { PokemonCard } from '@/components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const inter = Inter({ subsets: ['latin'] })

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Listado de Pokemon'>
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map( ( pokemon ) => (
            <PokemonCard key={ pokemon.id } pokemon={ pokemon }/>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?offset=386&limit=107');
  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 387,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 387 }.svg`
  }) )

  return {
    props: {
      pokemons
    }
  }
}
export default HomePage;