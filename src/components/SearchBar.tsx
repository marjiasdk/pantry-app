import React, { FC } from 'react';
import { TextField, Box, Paper } from '@mui/material';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Paper elevation={2} sx={{ padding: '1rem' }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>
    </Paper>
  );
};

export default SearchBar;
