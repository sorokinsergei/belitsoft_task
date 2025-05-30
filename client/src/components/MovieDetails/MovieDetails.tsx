import { Box, Typography } from '@mui/material';
import type { Movie } from '../../api-client/interfaces.ts';
import Rating from '../Rating/Rating.tsx';

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  console.log(movie);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        gap: '1rem',
        overflow: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="h4">
          {movie.name}
        </Typography>
        <Rating value={movie.rating.average} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', gap: '1rem' }}>
        <Box
          component="img"
          src={movie.image?.original ?? undefined}
          alt={movie.name}
          sx={{
            maxWidth: 350,
            maxHeight: 350,
          }}
        />
        <Box>
          <Typography>Released: {movie.ended}</Typography>
          <Typography>Language: {movie.language}</Typography>
          <Typography>Genres: {movie.genres.join(' / ')}</Typography>
          {movie.runtime && <Typography>Duration: {movie.runtime} mins.</Typography>}
          <Typography>Premiered: {movie.premiered}</Typography>
        </Box>
      </Box>
      {movie.summary && (
        <Box
          sx={{
            padding: '10px 15px',
            border: '1px solid #393737',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Summary:</Typography>
          <Typography dangerouslySetInnerHTML={{ __html: movie.summary }} />
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;
