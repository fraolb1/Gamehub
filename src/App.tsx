import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import FilterPlatform from "./components/FilterPlatform";
import { Genre } from "./hooks/useGenre";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genre: Genre;
  platform: Platform;
  sortOrder: string;
  searchQuery: string;
}

const App = () => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}>
      <GridItem area={"nav"}>
        <Navbar
          onSearchQuery={(searchQuery) =>
            setGameQuery({ ...gameQuery, searchQuery })
          }
        />
      </GridItem>
      <Show above='lg'>
        <GridItem area={"aside"}>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelected={(genre) => setGameQuery({ ...gameQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <Box paddingLeft={4}>
          <GameHeading gameQuery={gameQuery} />

          <HStack>
            <FilterPlatform
              onSelected={(platform) =>
                setGameQuery({ ...gameQuery, platform })
              }
            />
            <SortSelector
              selectedOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setGameQuery({ ...gameQuery, sortOrder })
              }
            />
          </HStack>
        </Box>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
};

export default App;
