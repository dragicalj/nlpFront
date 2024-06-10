import React from 'react';
import { useAnalysis } from './AnalysisContext';
import { Box, VStack, Text, Input, Button } from '@chakra-ui/react';

const CriteriaComponent = ({ category }) => {
  const { selectedCriteria } = useAnalysis();

  const renderCriteriaFields = () =>
    selectedCriteria.map((criteria, index) => (
      <Box key={index} p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
        <Text fontSize="lg" fontWeight="bold">{criteria}</Text>
        <Text mb={2}>Opis...</Text>
        <Input placeholder="Izračunata vrednost" value="Random Value" isReadOnly />
      </Box>
    ));

  const renderButtonsForGraphsAndTables = () => (
    <>
      {selectedCriteria.includes("Graph1") && <Button m={2}>Grafikon 1</Button>}
      {selectedCriteria.includes("Graph2") && <Button m={2}>Grafikon 2</Button>}
      {selectedCriteria.includes("Graph3") && <Button m={2}>Grafikon 3</Button>}
      {selectedCriteria.includes("FrequencyTable") && <Button m={2}>Tabela frekvencija</Button>}
    </>
  );

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl">{category}</Text>
      {renderCriteriaFields()}
      {renderButtonsForGraphsAndTables()}
    </VStack>
  );
};

export default CriteriaComponent;