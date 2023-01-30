import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { pokeApi } from '@/api';
import Layout from '@/components/layouts/Layout';
import { Grid, Card, Text, Button, Container, Image } from '@nextui-org/react';
import { localFavorite } from '@/utils';

import confetti from 'canvas-confetti';
import { PokemonListResponse } from '../../interfaces/pokemon-list';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
  pokemon: any;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState( localFavorite.existInFavorite( pokemon.id ) )

  const onToggleFavorite = () => {
    localFavorite.toggleFavorite( pokemon.id );
    setIsInFavorites( !isInFavorites );

    if( isInFavorites ) return;
    
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x:1,
        y:0
      }
    })
    
  }

  return (
    <Layout title={ pokemon.name }>
      
      <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
        
        <Grid xs={ 12 } sm={ 4 }>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image 
                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' } 
                alt={ pokemon.name}
                width='100%'
                height={ 200 }
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={ 12 } sm={ 8 }>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1>{ pokemon.name }</Text>
              <Button
                onPress={ onToggleFavorite }
                color="gradient"
                ghost={ !isInFavorites }
              >
                { isInFavorites ? 'Remover de favoritos' : 'Guardar en favoritos' }
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={ 30 }>Sprites</Text>

              <Container direction='row' display='flex' gap={ 0 }>
                <Image 
                  src={ pokemon.sprites.front_default }
                  alt= { pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image 
                  src={ pokemon.sprites.back_default }
                  alt= { pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image 
                  src={ pokemon.sprites.front_shiny }
                  alt= { pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image 
                  src={ pokemon.sprites.back_shiny }
                  alt= { pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>

    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?offset=386&limit=107');
    const pokemonsName: string[] = data.results.map( pokemon => pokemon.name )

  return {
    paths: pokemonsName.map( name => ({
      params: { name }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo( name ),
    }
  }
}



export default PokemonByNamePage;
