import React from 'react';
import {
  Box,
  Text,
  Input,
  HStack
} from '@chakra-ui/react';

function InfoBox({ numTokens, totalOccurrences, topToken, topWord }) {
  return (
    <Box borderWidth="3px" borderRadius="md" p={4} borderColor="#00693E" mt={1}>
      <HStack spacing={4} align="center">
        <Text>Found:</Text>
        <Input value={numTokens} isReadOnly />
        <Text>Number of occurrences:</Text>
        <Input value={totalOccurrences} isReadOnly />
        <Text>Top token:</Text>
        <Input value={topToken} isReadOnly />
        <Text>Top word:</Text>
        <Input value={topWord} isReadOnly />
      </HStack>
    </Box>
  );
}

export default InfoBox;