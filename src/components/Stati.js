import {
  Box, Button, Flex, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Stack, Textarea, useToast
} from "@chakra-ui/react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from "react";
import { Bloodtype } from "@mui/icons-material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stati = () => {
  const [resultText1, setResultText1] = useState('');
  const [resultText2, setResultText2] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const data = {
    labels: ['Reč1', 'Reč2', 'Reč3', 'Reč4', 'Reč5', 'Reč6', 'Reč7', 'Reč8', 'Reč9', 'Reč10'],
    datasets: [
      {
        label: 'Frekvencija pojavljivanja',
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#FF8C00',
          '#FF8C00',
          '#FF8C00',
          '#FF8C00',
          '#FF8C00',
          '#FF8C00',
          '#FF8C00',
          '#FF8C00',
          '#FF8C00',
          '#FF8C00',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'black',
          'black',
          'black',
          'black',
          'black',
          'black',
          'black',
          'black',
          'black',
          'black',
          // 'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)', 
          // 'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1.5
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        color: 'black',
        fontStyle: 'bold',
      },
      title: {
        display: false,
        text: 'Grafikon Frekvencija Reči',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          fontStyle: 'bold',
          color: 'black'
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          fontStyle: 'bold',
          color: 'black'
        },
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
      <Flex w='30%' ml='2%' mt='1%'  flexDir='column'>
      <Box
        bg='gray.200'
        p={5}
        borderRadius="lg"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
        minHeight='350px'
      >
        <Stack spacing={4}>
        <Heading as="h3" size="2xl" color="#00693E" fontWeight="bold" fontStyle="italic">
          Calculations
        </Heading>
          <Button
            onClick={handleFirstButtonClick}
            bg="#00693E"
            color="white"
            mt='1%'
            p={6}
            borderRadius="10px"
            fontSize="lg"
            _hover={{ bg: "#24527a" }}
            w='80%'
            ml='10%'
            height='30px'
            boxShadow="md"
          >
            Calculate entropy of the text
          </Button>

          <Textarea
            value={resultText1}
            placeholder="Result of first button"
            readOnly
            height="40px"
            resize="none"
            borderWidth="2px"
            borderColor="#306aa3"
            borderRadius="8px"
            fontSize="16px"
            mt={10}
            bg="white"
            ml='10%'
            w='78%'
            mk='10%'
            />
          <Button
            onClick={handleSecondButtonClick}
            bg="#00693E"
            color="white"
            mt='7%'
            p={6}
            borderRadius="10px"
            fontSize="lg"
            _hover={{ bg: "#24527a" }}
            w='80%'
            ml='10%'
            height='30px'
            boxShadow="md"
          >
            Calculate Shannon's entropy
          </Button>
          <Textarea
            value={resultText2}
            placeholder="Result of first button"
            readOnly
            height="40px"
            resize="none"
            borderWidth="2px"
            borderColor="#306aa3"
            borderRadius="8px"
            fontSize="16px"
            mt={10}
            bg="white"
            ml='10%'
            w='78%'
            mk='10%'
          />
        </Stack>
      </Box>
      <Box>
      <Button 
            onClick={onOpen}
            bg="#306aa3"
            color="white"
            mt='10%'
            p={6}
            borderRadius="5px"
            fontSize="lg"
            _hover={{ bg: "#24527a" }}
            w='90%'
            ml='5%'
            height='40px'
            boxShadow="md">
            Show graph
      </Button>
      
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            {/* <ModalOverlay /> */}
            <ModalContent
              mt='10%'
              ml='20%'
              w="60%"
              h='420px'
              border="2px solid #1f4c76"
              borderRadius='7px'
              backgroundColor='white'
            >
              <ModalHeader
                color="#306aa3"
                fontSize="2xl"
                fontWeight="bold"
                ml='40%'
              >
                Frequency words graph
                <ModalCloseButton
                color="red"
                position="absolute"
                right="2px"
                top="2px"
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '1rem',
                  padding: '5px',
                  borderRadius: '50%',
                  outline: 'none',
                  transition: 'background-color 0.3s ease',
                }}
                // Additional event handlers or props as needed
              />
              </ModalHeader>
              <ModalBody
                bg="white"
                shadow="md"
                p="6"
                mt='20px'
                ml='20px'
                mr='20px'
                height='340px'
              >
                <Bar
                  data={data}
                  options={options}
                  style={{ 
                    display: 'block',
                    minWidth: '85%',
                    maxWidth: '100%', 
                    margin: '0 auto' 
                  }} 
                />
              </ModalBody>
            </ModalContent>
          </Modal>
      </Box>

      </Flex>
      <Box w='60%' mr='4%' ml='3%'>
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
