import React from 'react';
import {
  Box,
  Collapse,
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Movie } from '../../api-client/interfaces.ts';
import MovieList from '../MovieList/MovieList.tsx';

interface GenreListProps {
  items: string[];
  selectedGenre: string | null | undefined;
  selectedMovieId: number | null | undefined;
  onSelectGenre: (id: string) => void;
  onSelectMovie: (id: number) => void;
  movies: Movie[];
}

const GenreList = ({
  items,
  selectedGenre,
  movies,
  selectedMovieId,
  onSelectGenre,
  onSelectMovie,
}: GenreListProps) => {
  return (
    <MuiList dense sx={{ overflow: 'scroll' }}>
      {items.map((item) => {
        const isSelected = item === selectedGenre;

        return (
          <React.Fragment key={item}>
            <ListItem
              key={item}
              component="div"
              disablePadding
              sx={{
                backgroundColor: isSelected ? '#989898' : 'transparent',
                borderLeft: isSelected ? '4px solid #666' : '4px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemButton onClick={() => onSelectGenre(item)}>
                <ListItemText primary={item} />
                <Box
                  sx={{
                    verticalAlign: 'middle',
                    transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    ':focus': {
                      outline: 0,
                    },
                  }}
                >
                  <ExpandMoreIcon />
                </Box>
              </ListItemButton>
            </ListItem>
            <Collapse
              in={selectedGenre === item}
              timeout={'auto'}
              unmountOnExit
              sx={{
                '& .MuiCollapse-wrapperInner': {
                  pl: 1,
                  pr: 2,
                  pb: 2,
                },
              }}
            >
              <Box sx={{ textAlign: 'left', pb: 2 }}>
                <MovieList items={movies} selected={selectedMovieId} onSelect={onSelectMovie} />
              </Box>
            </Collapse>
          </React.Fragment>
        );
      })}
    </MuiList>
  );
};

export default GenreList;
