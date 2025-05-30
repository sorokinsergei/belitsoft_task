import { useEffect, useMemo, useState, useTransition } from 'react';
import { Container, Box } from '@mui/material';
import { apiClient } from '../api-client/apiClient';
import Search from '../components/Search/Search';
import type { Movie } from '../api-client/interfaces';
import GenreList from '../components/GenreList/GenreList';
import MovieDetails from '../components/MovieDetails/MovieDetails.tsx';
import { useDebounce } from '../hooks/useDebaunce.tsx';

const MoviesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const { debouncedValue: debouncedSearch } = useDebounce(search, 500);
  const [showsByGenres, setShowsByGenres] = useState<Map<string, Movie[]>>(new Map());
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (debouncedSearch.trim() === '') {
      return;
    }

    let cancelledRequest = false;

    startTransition(async () => {
      const response = await apiClient.movies.search(debouncedSearch);

      if (cancelledRequest) return;

      const genresMap = new Map<string, Movie[]>();
      response.profession.forEach(({ show }) => {
        show.genres.forEach((genre) => {
          if (genresMap.has(genre)) {
            genresMap.set(genre, [...(genresMap.get(genre) as Movie[]), show]);
          } else {
            genresMap.set(genre, [show]);
          }
        });
      });

      setShowsByGenres(genresMap);
    });

    return () => {
      cancelledRequest = true;
    };
  }, [debouncedSearch]);

  const genres = useMemo(() => [...showsByGenres.keys()], [showsByGenres]);
  const movies = useMemo(() => {
    if (selectedGenre && showsByGenres.has(selectedGenre)) {
      return showsByGenres.get(selectedGenre) || [];
    }

    return [];
  }, [selectedGenre, showsByGenres]);

  const selectedMovie = useMemo(() => {
    return movies.find((movie) => movie.id === selectedMovieId);
  }, [movies, selectedMovieId]);

  const handleChangeSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

  const handleSelectMovie = (showId: number) => {
    setSelectedMovieId(showId);
  };

  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: '12px 24px',
        overflow: 'hidden',
      }}
    >
      <Search value={search} isLoading={isPending} onChange={handleChangeSearch} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '1rem',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '350px',
            flexShrink: 0,
            overflow: 'auto',
          }}
        >
          <GenreList
            items={genres}
            movies={movies}
            selectedGenre={selectedGenre}
            selectedMovieId={selectedMovieId}
            onSelectGenre={handleSelectGenre}
            onSelectMovie={handleSelectMovie}
          />
        </Box>

        {selectedMovie && <MovieDetails movie={selectedMovie} />}
      </Box>
    </Container>
  );
};

export default MoviesPage;
