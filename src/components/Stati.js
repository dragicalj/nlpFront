import {
  Box, Button, Flex, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Stack, Textarea, useToast
} from "@chakra-ui/react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stati = () => {
  const [resultText1, setResultText1] = useState('');
  const [resultText2, setResultText2] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const data = {
    labels: ['Reč1', 'Reč2', 'Reč3', 'Reč4', 'Reč5', 'Reč1', 'Reč2', 'Reč3', 'Reč4', 'Reč5'],
    datasets: [
      {
        label: 'Frekvencija pojavljivanja',
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)','rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Grafikon Frekvencija Reči',
      },
    },
    scales: {
      // ... other scale options
      x: {
        grid: {
          display: false, // to remove grid lines for x-axis
        }
      },
      y: {
        grid: {
          display: false, // to remove grid lines for y-axis
        }
      },
    }
  };
  const handleFirstButtonClick = () => {
    const result = 'Prvi unos je ažuriran.';
    setResultText1(result);
    toast({
      title: 'Akcija izvršena',
      description: "Rezultat prvog dugmeta je ažuriran.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSecondButtonClick = () => {
    const result = 'Drugi unos je ažuriran.';
    setResultText2(result);
    toast({
      title: 'Akcija izvršena',
      description: "Rezultat drugog dugmeta je ažuriran.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex flexDir='row' p={4} bg="white" borderRadius="10px">
      <Box
        w='25%'
        maxH='400px'
        bg='gray.200'
        p={5}
        borderRadius="lg"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
      >
        <Stack spacing={4} align="center">
          <Button
            onClick={handleFirstButtonClick}
            bg="#00693E"
            color="white"
            p={6}
            borderRadius="md"
            fontSize="lg"
            _hover={{ bg: "#24527a" }}
            w='80%'
          >
            Prvo Dugme
          </Button>
          <Textarea
            value={resultText1}
            placeholder="Rezultat prvog dugmeta..."
            readOnly
            resize="none"
            bg="white"
            borderColor="#495057"
            w='80%'
          />
          <Button
            onClick={handleSecondButtonClick}
            bg="#00693E"
            color="white"
            p={6}
            borderRadius="md"
            fontSize="lg"
            _hover={{ bg: "#24527a" }}
            w='80%'
          >
            Drugo Dugme
          </Button>
          <Textarea
            value={resultText2}
            placeholder="Rezultat drugog dugmeta..."
            readOnly
            resize="none"
            bg="white"
            borderColor="#495057"
            w='80%'
          />
          <Button onClick={onOpen} mt={4} bg="#306aa3" color="white">
        Prikaz Grafikona
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent
    mx="auto"
    my="auto"
    w="auto"
    maxW="2xl" // Širi modal
    borderRadius="xl" // Zaobljene ivice za celi modal
    boxShadow="2xl"
    mt="200px"
    border="4px solid #1f4c76"
  >
    <ModalHeader
      bg="blue.500"
      color="white"
      fontSize="lg"
      fontWeight="bold"
      position="relative"
      borderRadius="xl 0 0 xl" // Zaobljivanje samo gornjih ivica naslova da odgovaraju ModalContent
    >
      
      <ModalCloseButton
        color="white"
        position="absolute"
        right="4px"
        top="4px"
      />
    </ModalHeader>
    <ModalBody
      bg="white"
      shadow="md"
      p="6"
      borderRadius="0 0 xl xl" // Zaobljivanje samo donjih ivica tela da odgovaraju ModalContent
    >
      <Bar
        data={data}
        options={options}
        style={{ 
          display: 'block', 
          maxWidth: '100%', 
          height: '300px', // Smanjena visina grafikona
          margin: '0 auto' 
        }} 
      />
    </ModalBody>
  </ModalContent>
</Modal>
        </Stack>
      </Box>
      <Box w='60%' mr='4%' ml='30px'>
        <Heading as="h3" size="2xl" color="#00693E" fontWeight="bold" fontStyle="italic">
          Text for Analysis
        </Heading>
        <Stack spacing={10}>
          <Textarea
            value={'uploadedText'}
            readOnly
            height="470px"
            resize="none"
            borderWidth="2px"
            borderColor="#306aa3"
            borderRadius="8px"
            fontSize="16px"
            color="#495057"
            overflowY="scroll"
            mt={10}
          />
        </Stack>
      </Box>
    </Flex>
  );
};

export default Stati;
