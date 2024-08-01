import React, { FC } from 'react';
import { Button, List, ListItem, ListItemText, Box, Paper, Typography } from '@mui/material';
import { deleteItem, getItems, Item } from '../firebase/pantryService';

interface PantryListProps {
  items: Item[];
  setItem: (item: Item) => void;
  setIsEditing: (isEditing: boolean) => void;
  setItems: (items: Item[]) => void; // Add this prop to update items
}

const PantryList: FC<PantryListProps> = ({ items, setItem, setIsEditing, setItems }) => {
  const handleDelete = async (id?: string) => {
    if (id) {
      await deleteItem(id);
      // Refresh the items after deletion
      const updatedItems = await getItems();
      setItems(updatedItems);
    }
  };

  const handleEdit = (item: Item) => {
    setItem(item);
    setIsEditing(true);
  };

  return (
    <Paper elevation={2} sx={{ padding: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Pantry List
      </Typography>
      <Box>
        <List>
          {items.map((item) => (
            <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
              <Box>
                <Button variant="contained" color="primary" onClick={() => handleEdit(item)} sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default PantryList;
