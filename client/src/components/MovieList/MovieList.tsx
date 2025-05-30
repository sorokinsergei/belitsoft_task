import { Box, List as MuiList, ListItem, ListItemButton, Typography } from '@mui/material';
import type { Movie } from '../../api-client/interfaces';

interface MovieListProps {
  items: Movie[];
  selected: number | null | undefined;
  onSelect: (id: number) => void;
}

const MovieList = ({ items, selected, onSelect }: MovieListProps) => {
  return (
    <MuiList dense>
      {items.map((item) => (
        <ListItem
          key={item.id}
          component="div"
          disablePadding
          sx={{ backgroundColor: item.id === selected ? '#8e8e8e' : 'transparent' }}
        >
          <ListItemButton onClick={() => onSelect(item.id)} sx={{ gap: '1rem' }}>
            <Box
              component="img"
              src={item.image?.medium ?? undefined}
              alt={item.name}
              sx={{
                maxWidth: 150,
                maxHeight: 150,
              }}
            />
            <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </MuiList>
  );
};

export default MovieList;
