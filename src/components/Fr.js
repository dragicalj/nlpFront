import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Input,
  Button,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea
} from '@chakra-ui/react';

function Fr() {
    const [showTable, setShowTable] = useState(false);

    const handleTokenize = () => {
        // Add logic for tokenization if necessary
        setShowTable(true);
      };
    
      return (
        <ChakraProvider>
          <Box p={4}>
            {/* Header */}
            <Box mb={4}>
              <Text fontSize="xl" fontWeight="bold">Electronic Corpus Application</Text>
              
            </Box>
    
            {/* Main Content */}
            <Box display="flex">
              {/* Conditional render */}
              {!showTable ? (
                // TextArea
                <Box flex="1" mr={4}>
                  <Textarea placeholder="Enter text here..." size="lg" minHeight="400px" mb={4} />
                  <Button colorScheme="blue" onClick={handleTokenize}>
                    Tokenize
                  </Button>
                </Box>
              ) : (
                // Table
                <Box flex="1" mr={4}>
                  <Table variant="simple" size="lg">
                    <Thead>
                      <Tr>
                        <Th>Original Text</Th>
                        <Th>Concordance</Th>
                        <Th>Frequency</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {/* Dynamically generate rows here */}
                      <Tr>
                        <Td>Example Text</Td>
                        <Td>Example Concordance</Td>
                        <Td>123</Td>
                      </Tr>
                      {/* ... */}
                    </Tbody>
                  </Table>
                </Box>
              )}
    
              {/* Sidebar */}
              <Box width="300px">
            <Box mb={4}>
              <Text mb={2}>Filter by word type:</Text>
              <Select placeholder="Select option">
                {/* Options here */}
              </Select>
            </Box>
            <Box mb={4}>
              <Text mb={2}>Include grammatical forms:</Text>
              <Checkbox defaultIsChecked>Include</Checkbox>
            </Box>
            <Box mb={4}>
              <Text mb={2}>Sort by frequency:</Text>
              <RadioGroup defaultValue="absolute">
                <Stack spacing={5} direction="column">
                  <Radio value="absolute">Absolute</Radio>
                  <Radio value="relative">Relative</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box mb={4}>
              <Text mb={2}>Frequency range:</Text>
              <Slider aria-label="slider-ex-1" defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Button colorScheme="blue">Search</Button>
          </Box>
        </Box>
            </Box>
       
        </ChakraProvider>
      );
}

export default Fr;
