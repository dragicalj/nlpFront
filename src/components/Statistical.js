import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  useDisclosure,
  Stack,
  Textarea,
  useToast
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistical = ({ sharedText, setSharedText, textId, setTextId }) => {
  const [texts, setTexts] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(textId);
  const [selectedTextContent, setSelectedTextContent] = useState(sharedText);
  const userId = localStorage.getItem('user_id');
  const [resultText1, setResultText1] = useState('');
  const [resultText2, setResultText2] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [entropy, setEntropy] = useState('');
  const [shannonValue, setShannonValue] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await fetch(`http://138.68.107.72:8000/api/texts/${userId}/`);
        const data = await response.json();
        setTexts(data);
      } catch (error) {
        console.error('Error fetching texts:', error);
      }
    };
    fetchTexts();
  }, [userId]);


  useEffect(() => {
    if (selectedTextContent) {
      fetchTextMetadataByContent(selectedTextContent);
    }
  }, []); 

  const fetchTextMetadataByContent = async (content) => {
    try {
      const response = await fetch(`hhttp://138.68.107.72:8000/api/text_entropy_shannon_by_content/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: content })
      });
      const data = await response.json();
      if (response.ok) {
        setEntropy(data.entropy);
        setShannonValue(data.shannon_value);
      } else {
        toast({
          title: "Error fetching text metadata.",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error fetching text metadata.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleTextSelect = async (event) => {
    const textId = event.target.value;
    setSelectedTextId(textId);
    try {
      const response = await fetch(`http://138.68.107.72:8000/api/texts2/${textId}/`);
      const data = await response.json();
      if (response.ok) {
        setSelectedTextContent(data.content);
        setSharedText(data.content);
        fetchTextMetadata(textId);
        setTextId(textId);
      } else {
        console.error('Error fetching text content:', data.error);
      }
    } catch (error) {
      console.error('Error fetching text content:', error);
    }
  };

  const fetchTextMetadata = async (id) => {
    try {
      const response = await fetch(`http://138.68.107.72:8000/api/text_entropy_shannon/${id}/`);
      const data = await response.json();
      if (response.ok) {
        setEntropy(data.entropy);
        setShannonValue(data.shannon_value);
      } else {
        console.error('Error fetching text metadata:', data.error);
      }
    } catch (error) {
      console.error('Error fetching text metadata:', error);
    }
  };

  const handleTokenize = async () => {
    try {
      const response = await fetch('http://138.68.107.72:8000/api/tokenize_text_only/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: selectedTextContent })
      });
      const data = await response.json();
      if (response.ok) {
        const labels = Object.keys(data);
        const values = Object.values(data);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Word Frequency',
              data: values,
              backgroundColor: '#FF8C00',
              borderColor: '#FF8C00',
              borderWidth: 5,
            }
          ]
        });
        onOpen();
      } else {
        console.error('Error tokenizing text:', data.error);
      }
    } catch (error) {
      console.error('Error tokenizing text:', error);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      }
    },
    scales: {
      x: {
        display: false, 
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Flex flexDir='row' p={4} bg="white" borderRadius="10px">
      <Flex w='30%' ml='2%' mt='1%' flexDir='column'>
        <Box
          bg='gray.200'
          p={5}
          borderRadius="lg"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
          overflow="hidden"
          minHeight='350px'
        >
          <Stack spacing={1}>
            <Heading as="h3" size="xl" color="#00693E" fontWeight="bold" fontStyle="italic">
              Calculations
            </Heading>
            <Box
              bg="#00693E"
              color="white"
              mt="1%"
              p={6}
              borderRadius="10px"
              fontSize="lg"
              _hover={{ bg: "#24527a" }}
              w="80%"
              ml="10%"
              height="30px"
              boxShadow="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Entropy of the text:
            </Box>

            <Textarea
              value={entropy}
              placeholder=""
              readOnly
              height="1px"
              resize="none"
              borderWidth="2px"
              borderColor="#306aa3"
              borderRadius="8px"
              fontSize="26px"
              mt={3}
              bg="white"
              ml='10%'
              w='80%'
              maxH="1%"
              mk='10%'
              textAlign="center"
              minHeight="65px"
              maxHeight="90px"
            />
            <Box
              bg="#00693E"
              color="white"
              mt="1%"
              p={6}
              borderRadius="10px"
              fontSize="lg"
              _hover={{ bg: "#24527a" }}
              w="80%"
              ml="10%"
              height="30px"
              boxShadow="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Shannon's equitability:
            </Box>
            <Textarea
              value={shannonValue}
              placeholder=""
              readOnly
              height="10px"
              resize="none"
              borderWidth="2px"
              borderColor="#306aa3"
              borderRadius="8px"
              fontSize="26px"
              mt={3}
              bg="white"
              ml='10%'
              w='80%'
              mk='10%'
              textAlign="center"
              minHeight="65px"
              maxHeight="90px"
            />
          </Stack>
        </Box>
        <Box>
          <Button
            onClick={handleTokenize}
            bg="#306aa3"
            color="white"
            mt='5%'
            p={6}
            borderRadius="5px"
            fontSize="xl"
            _hover={{ bg: "#24527a" }}
            w='100%'
            height='40px'
            boxShadow="md"
            style={{ fontSize: '1.2em' }}
          >
            Zipf's distribution
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent mt="10%">
              <ModalHeader textAlign="center">Graph of Zipf's distribution</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Bar data={chartData} options={chartOptions} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
      <Box w='60%' mr='4%' ml='3%' mt="1%">
        <Heading as="h3" size="xl" color="#00693E" fontWeight="bold" fontStyle="italic">
          Text for Analysis
        </Heading>
        <Select placeholder="Select a text..." mb={4} mt="1%" onChange={handleTextSelect}>
          {texts.map((text) => (
            <option key={text.id} value={text.id}>{text.title}</option>
          ))} </Select>

        <Stack spacing={10}>
          <Textarea
            placeholder=" "
            value={selectedTextContent}
            readOnly
            height="350px"
            resize="none"
            borderWidth="3px"
            borderColor="#306aa3"
            borderRadius="8px"
            fontSize="16px"
            color="#495057"
            overflowY="scroll"
           
          />
        </Stack>
      </Box>
    </Flex>
  );
};

export default Statistical;