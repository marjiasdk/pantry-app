import React, { FC, useState } from 'react';
import { TextField, Button, Box, CircularProgress, Paper, Typography } from '@mui/material';
import { addItem, updateItem, Item } from '../firebase/pantryService';

interface PantryFormProps {
  item: Item;
  setItem: (item: Item) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onSave: () => Promise<void>; // Make sure this is an async function
}

const PantryForm: FC<PantryFormProps> = ({ item, setItem, isEditing, setIsEditing, onSave }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && item.id) {
        await updateItem(item.id, item);
      } else {
        await addItem(item);
      }
      await onSave(); // Await the onSave callback
      setItem({ name: '', quantity: '' });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding/updating item: ", error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <Paper elevation={2} sx={{ padding: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        {isEditing ? 'Update Item' : 'Add Item'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Add'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PantryForm;
