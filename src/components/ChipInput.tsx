import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const ChipInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setChips([...chips, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteChip = (index: number) => {
    const newChips = chips.filter((_, chipIndex) => chipIndex !== index);
    setChips(newChips);
  };

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      {chips.map((chip, index) => (
        <Chip key={index} label={chip} onDelete={() => handleDeleteChip(index)} />
      ))}
      <TextField
        label="Type and press enter"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        fullWidth
        InputProps={{ disableUnderline: true }}
      />
    </Box>
  );
};

export default ChipInput;
