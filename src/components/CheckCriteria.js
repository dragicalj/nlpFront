import React, { useState, useContext } from 'react';
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  Heading,
  Button
} from '@chakra-ui/react';
import { AnalysisContext } from './AnalysisContext';
import { useAnalysis } from './AnalysisContext'; 



const CheckCriteria = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const { setSelectedCriteria, setShowResults } = useContext(AnalysisContext);

  const handleCompareClick = () => {
    setSelectedCriteria(checkedItems);
    setShowResults(true);
  };
  
  const handleCheck = (e) => {
    const item = e.target.name;
    setCheckedItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <Box p={3} border="1px solid #CBD5E0" borderRadius="md" w="full" mb="1%" mt="0px">
      <Heading size="s" mb={4}>
        Mark the criteria you want to analyze:
      </Heading>
      <CheckboxGroup value={checkedItems}>
        <Stack direction="column" fontSize="xs">
          <Checkbox name="Entropy" fontSize="xs" onChange={handleCheck}>Entropy</Checkbox>
          <Checkbox name="Shannon Equitability" onChange={handleCheck}>Shannon equitability</Checkbox>
          <Checkbox name="Token Number" onChange={handleCheck}>Token number</Checkbox>
          <Checkbox name="Top Token" onChange={handleCheck}>Top token</Checkbox>
          <Checkbox name="Top Word" onChange={handleCheck}>Top word</Checkbox>
          
        </Stack>
      </CheckboxGroup>
      <Button onClick={handleCompareClick} colorScheme="blue" width="100%" height="30px" mt="5%" bg="#306aa3">
        Compare
      </Button>
    </Box>
  );
};

export default CheckCriteria;