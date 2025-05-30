import { TextField, CircularProgress, InputAdornment } from '@mui/material';
import { useState } from 'react';

interface SearchProps {
  value: string;
  isLoading: boolean;
  onChange: (text: string) => void;
}

const SEARCH_MAX_LENGTH = 100;

const Search = ({ value, isLoading, onChange }: SearchProps) => {
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();

    if (newValue.length > SEARCH_MAX_LENGTH) {
      setError('Search input must be 100 characters or less');
      return;
    } else {
      setError(null);
    }
    onChange(newValue);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleChange}
      sx={{ mb: 3 }}
      error={!!error}
      helperText={error}
      slotProps={{
        input: {
          endAdornment: isLoading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
};

export default Search;
