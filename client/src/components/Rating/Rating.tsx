import React from 'react';
import { Rating as MuiRating, Box, Typography } from '@mui/material';

interface RatingProps {
  value?: number | null | undefined;
}

const getColor = (value?: number | null | undefined): string => {
  if (value === undefined || value === null) return '#9e9e9e'; // Gray
  if (value >= 8) return '#4caf50'; // Green
  if (value >= 6) return '#ff9800'; // Orange
  return '#f44336'; // Red
};

const Rating: React.FC<RatingProps> = ({ value }) => {
  const normalized = Math.round(((value || 0) / 2) * 10) / 10;
  const color = getColor(value);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <MuiRating
        value={normalized}
        precision={0.1}
        readOnly
        sx={{
          color,
          '& .MuiRating-iconEmpty': { color: '#ccc' },
        }}
      />
      <Typography variant="body2" color="text.secondary">
        {typeof value === 'number' ? `${(value as number).toFixed(1)} / 10` : 'No rating'}
      </Typography>
    </Box>
  );
};

export default Rating;
