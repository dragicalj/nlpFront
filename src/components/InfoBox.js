import React from 'react';
import {
  Box,
  Text,
  Input,
  HStack
} from '@chakra-ui/react';

function InfoBox({ metadata }) {
  return (
    <Box borderWidth="3px" borderRadius="md" p={4} borderColor="#00693E" mt={1}>
      <HStack spacing={4} align="center">
        <Text>Found:</Text>
        <Input placeholder="1305" value={metadata ? metadata.num_tokens : ''} isReadOnly />
        <Text>Number of occurrences:</Text>
        <Input placeholder="7722" value={metadata ? metadata.num_occurrences : ''} isReadOnly />
        <Text>Top token:</Text>
        <Input placeholder="the" value={metadata ? metadata.top_token : ''} isReadOnly />
        <Text>Top word:</Text>
        <Input placeholder="love" value={metadata ? metadata.top_word : ''} isReadOnly />
      </HStack>
    </Box>
  );
}

export default InfoBox;