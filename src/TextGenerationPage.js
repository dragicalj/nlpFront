import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FaChartBar, FaPaperPlane, FaUpload } from "react-icons/fa";
import { useState } from "react";

const TextGenerationPage = ({ showStatisticalAnalysis }) => {
  const [uploadedText, setUploadedText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [entropyResult, setEntropyResult] = useState('');
  const [shannonsEntropyResult, setShannonsEntropyResult] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await readFile(file);
        setUploadedText(text);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleChatGPTInteraction = () => {
    // ChatGPT interaction logic
    setTimeout(() => {
      setGeneratedText("Hello! How can I assist you today?");
    }, 1000);
  };

  const handleSendMessage = () => {
    setUserMessage('');
    handleChatGPTInteraction();
  };

  const calculateEntropy = (text) => {
    setEntropyResult('8.062');
  };

  const calculateShannonsEntropy = (text) => {
    // Shannon's entropy calculation logic
    setShannonsEntropyResult('0.805');
  };
 

  const [showGraph, setShowGraph] = useState(false); // State to control graph visibility

  const handleDrawZipfGraph = () => {
    setShowGraph(true); // Toggle graph visibility
  };

  // Example data for the Zipf distribution graph
  const graphData = [
    { word: 'the', frequency: 80 },
    { word: 'and', frequency: 40 },
    { word: 'to', frequency: 20 },
    { word: 'of', frequency: 8 },
    { word: 'or', frequency: 3 },
    { word: '.', frequency: 3 },
    { word: 'a', frequency: 3 },
    { word: 'this', frequency: 3 },
  ];

  const barWidth = 20; // Width of each bar
    const maxFrequency = Math.max(...graphData.map(item => item.frequency)) + 5; // Calculate max frequency and add some padding

  return (
    <Flex flexDir='row' p={4} bg="white" borderRadius="10px">
    <Box flex="1" mr={4} w='40%'>
        <Stack align="center" spacing={6}>
          <Box mt='2%'>
          <Heading as="h3" size="2xl" color="#00693E" fontWeight="bold" fontStyle="italic">
          Local upload:
          </Heading>
              <Button
                as="label"
                htmlFor="fileInput"
                bg="#ffffff"
                borderWidth="3px"
                borderStyle="dashed"
                borderColor="#306aa3"
                borderRadius="12px"
                cursor="pointer"
                transition="border 0.3s ease-in-out"
                _hover={{ borderColor: "#306aa3" }}
                h='60px'
                w='400px'
              >
                <FaUpload fontSize="2em" mb={2} color="#306aa3" />
                Click to Upload
              </Button>
              <Input
                hidden
                type="file"
                id="fileInput"
                accept=".txt"
                onChange={(e) => handleFileUpload(e)}
              />
          </Box>
          <Box  mt='15%' ml={25} >
          <Flex direction="column">
          
          <Heading as="h3" size="2xl" color="#00693E" fontWeight="bold" fontStyle="italic">
            ChatGPT text generator:
          </Heading>
          <Box>
          <Text fontSize="l" color="#306aa3" fontWeight="bold">
            ChatGPT:
          </Text>
          </Box>
            
          <Box
            mb={4}
            backgroundColor='#306aa3'
            borderRadius="10px"
            w='93%'
            h='50px'
          >
            <Flex ml={5}>
              <Text color="white" mr={2} ml={5}>
                 Hello! How can I assist you today?
              </Text>
            </Flex>
          </Box>
          <Box>
          <Text fontSize="l" color="#306aa3" fontWeight="bold">
            User:
          </Text>
          </Box>
              <Flex alignItems="center">
                <Textarea
                  placeholder="Type your message..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  borderWidth="2px"
                  borderRadius="8px"
                  fontSize="16px"
                  color="#495057"
                  h="70px"
                  resize="none"
                  w='400px'
                  p={2}
                  borderColor="#306aa3"
                />
                <Button
                  onClick={handleSendMessage}
                  bg="#306aa3"
                  color="white"
                  border="none"
                  borderRadius="8px"
                  p={2}
                  ml={5}
                  cursor="pointer"
                  fontSize="22px"
                  transition="background-color 0.2s"
                  _hover={{ backgroundColor: "#0056b3" }}
                >
                  <FaPaperPlane />
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Stack>
    </Box>
    <Box  w='60%' mr='4%'>
    <Heading as="h3" size="2xl" color="#00693E" fontWeight="bold" fontStyle="italic">
      Text for Analysis
    </Heading>
      <Stack spacing={4}>
        <Textarea
          value={uploadedText}
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

export default TextGenerationPage;