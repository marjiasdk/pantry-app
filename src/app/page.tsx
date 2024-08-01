"use client";

import React, { useState, useEffect } from 'react';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import SearchBar from '../components/SearchBar';
import { getItems, Item } from '../firebase/pantryService';
import { Container, Typography, Box, Paper } from '@mui/material';

const Home: React.FC = () => {
  const [item, setItem] = useState<Item>({ name: '', quantity: '' });
  const [items, setItems] = useState<Item[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = async () => {
    const fetchedItems = await getItems();
    setItems(fetchedItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddOrUpdateItem = async () => {
    await fetchItems(); // Fetch items to update the list
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <Typography variant="h3" gutterBottom align="center">
          Pantry Management
        </Typography>
        <Box sx={{ mb: 3 }}>
          <PantryForm item={item} setItem={setItem} isEditing={isEditing} setIsEditing={setIsEditing} onSave={handleAddOrUpdateItem} />
        </Box>
        <Box sx={{ mb: 3 }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Box>
        <PantryList items={filteredItems} setItem={setItem} setIsEditing={setIsEditing} setItems={setItems} />
      </Paper>
    </Container>
  );
};

export default Home;
