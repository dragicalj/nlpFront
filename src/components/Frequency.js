import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
  Spinner,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react';
import FrequencyRangeSlider from './FrequencyRangeSlider';
import InfoBox from './InfoBox';

function Frequency({ sharedText, setSharedText, textId, setTextId }) {
  const [texts, setTexts] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(textId);
  const [selectedTextContent, setSelectedTextContent] = useState(sharedText);
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [metadata, setMetadata] = useState({ num_tokens: 0, num_occurrences: 0, top_token: '', top_word: '' });
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('');
  const [sortOrder, setSortOrder] = useState('relative');
  const [frequencyRange, setFrequencyRange] = useState({ from: 0, to: 100 });
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();


  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchTexts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://138.68.107.72:8000/api/texts/${userId}/`);
        const data = await response.json();
        setTexts(data);
      } catch (error) {
        setError('Error fetching texts');
        console.error('Error fetching texts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTexts();
  }, [userId]);

  useEffect(() => {
    const savedTableData = localStorage.getItem('tableData');
    const savedShowTable = localStorage.getItem('showTable');
    const savedSelectedPartOfSpeech = localStorage.getItem('selectedPartOfSpeech');
    const savedSortOrder = localStorage.getItem('sortOrder');
    const savedFrequencyRange = localStorage.getItem('frequencyRange');
    const savedFilteredData = localStorage.getItem('filteredData');
    const savedSelectedTextId = localStorage.getItem('selectedTextId');
    const savedSelectedTextContent = localStorage.getItem('selectedTextContent');
    const savedMetadata = localStorage.getItem('metadata');

    if (savedTableData) {
      setTableData(JSON.parse(savedTableData));
    }
    if (savedShowTable) {
      setShowTable(JSON.parse(savedShowTable));
    }
    if (savedSelectedPartOfSpeech) {
      setSelectedPartOfSpeech(savedSelectedPartOfSpeech);
    }
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
    if (savedFrequencyRange) {
      setFrequencyRange(JSON.parse(savedFrequencyRange));
    }
    if (savedFilteredData) {
      setFilteredData(JSON.parse(savedFilteredData));
    }
    if (savedSelectedTextId) {
      setSelectedTextId(savedSelectedTextId);
    }
    if (savedSelectedTextContent) {
      setSelectedTextContent(savedSelectedTextContent);
    }
    if (savedMetadata) {
      setMetadata(JSON.parse(savedMetadata));
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('tableData', JSON.stringify(tableData));
      localStorage.setItem('showTable', JSON.stringify(showTable));
      localStorage.setItem('selectedPartOfSpeech', selectedPartOfSpeech);
      localStorage.setItem('sortOrder', sortOrder);
      localStorage.setItem('frequencyRange', JSON.stringify(frequencyRange));
      localStorage.setItem('filteredData', JSON.stringify(filteredData));
      localStorage.setItem('selectedTextId', selectedTextId);
      localStorage.setItem('selectedTextContent', selectedTextContent);
      localStorage.setItem('metadata', JSON.stringify(metadata));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [tableData, showTable, selectedPartOfSpeech, sortOrder, frequencyRange, filteredData, selectedTextId, selectedTextContent, metadata]);

  const handleTextSelect = async (event) => {
    const textId = event.target.value;
    setSelectedTextId(textId);
    setIsLoading(true);
    try {
      const response = await fetch(`http://138.68.107.72:8000/api/texts2/${textId}/`);
      const data = await response.json();
      if (response.ok) {
        setSelectedTextContent(data.content);
        setSharedText(data.content);
        setTextId(data.id);
      } else {
        setError('Error fetching text content');
        console.error('Error fetching text content:', data.error);
      }
    } catch (error) {
      setError('Error fetching text content');
      console.error('Error fetching text content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenize = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://138.68.107.72:8000/api/tokenize_text/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: selectedTextContent })
      });
      const data = await response.json();
      if (response.ok) {
        setTableData(data);
        setShowTable(true);
        //fetchTextMetadata(selectedTextId);
        setFilteredData(data);

        // Calculate metadata
        const numTokens = data.length;
        const totalOccurrences = data.reduce((sum, item) => sum + item.concordance, 0);
        const topToken = data.reduce((prev, current) => (prev.concordance > current.concordance) ? prev : current).text;
        const topWord = calculateTopWord(data);

        setMetadata({
          num_tokens: numTokens,
          num_occurrences: totalOccurrences,
          top_token: topToken,
          top_word: topWord
        });

        localStorage.setItem('tableData', JSON.stringify(data));
        localStorage.setItem('showTable', JSON.stringify(true));
        localStorage.setItem('filteredData', JSON.stringify(data));
        localStorage.setItem('metadata', JSON.stringify({
          num_tokens: numTokens,
          num_occurrences: totalOccurrences,
          top_token: topToken,
          top_word: topWord
        }));
      } else {
        setError('Error tokenizing text');
        console.error('Error tokenizing text:', data.error);
      }
    } catch (error) {
      setError('Error tokenizing text');
      console.error('Error tokenizing text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTextMetadata = async (id) => {
    try {
      const response = await fetch(`http://138.68.107.72:8000/text_metadata/${id}/`);
      const data = await response.json();
      if (response.ok) {
        setMetadata(data);
        localStorage.setItem('metadata', JSON.stringify(data));
      } else {
        setError('Error fetching text metadata');
        console.error('Error fetching text metadata:', data.error);
      }
    } catch (error) {
      setError('Error fetching text metadata');
      console.error('Error fetching text metadata:', error);
    }
  };

  const handlePartOfSpeechChange = (event) => {
    setSelectedPartOfSpeech(event.target.value);
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  };

  const handleFrequencyRangeChange = (from, to) => {
    setFrequencyRange({ from, to });
  };

  const filterAndSortData = (data) => {
    if ((frequencyRange.from !== 0 && frequencyRange.to !== 100) || (frequencyRange.from >= frequencyRange.to)) {
      toast({
        title: "Invalid frequency range.",
        description: "Please select a range starting from 0 or ending at 100.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return [];
    }
    let sortedData = [...data].sort((a, b) => b.concordance - a.concordance);

    const totalItems = sortedData.length;
    console.log(totalItems);
    let startIndex;
    let endIndex;
    if(frequencyRange.to == 100){
      startIndex=0;
      const procenat=(frequencyRange.to-frequencyRange.from)/100;
      endIndex = procenat*totalItems;
      //const startIndex = Math.floor(totalItems * (frequencyRange.from / 100));
      console.log(frequencyRange.from);
      console.log(startIndex);
      //const endIndex = Math.ceil(totalItems * (frequencyRange.to / 100));
      console.log(endIndex);
      console.log(frequencyRange.to);
    }

    if(frequencyRange.from == 0){
      endIndex=totalItems;
      const procenat=(frequencyRange.to-frequencyRange.from)/100;
      startIndex = totalItems - (procenat*totalItems);
      //const startIndex = Math.floor(totalItems * (frequencyRange.from / 100));
      console.log(frequencyRange.from);
      console.log(startIndex);
      //const endIndex = Math.ceil(totalItems * (frequencyRange.to / 100));
      console.log(endIndex);
      console.log(frequencyRange.to);
    }

    if(frequencyRange.to==0 && frequencyRange.from==100){
      startIndex=0;
      endIndex=totalItems;
    }

    let rangeData = sortedData.slice(startIndex, endIndex);
    //const startIndex = Math.floor(totalItems * (frequencyRange.from / 100));

    //let rangeData = sortedData.slice(1, 20);

    if (selectedPartOfSpeech) {
      rangeData = rangeData.filter(item => item.type === selectedPartOfSpeech);
    }

    if (sortOrder === 'relative') {
      rangeData.sort((a, b) => b.concordance - a.concordance);
    } else if (sortOrder === 'absolute') {
      rangeData.sort((a, b) => a.text.localeCompare(b.text));
    }

    return rangeData;
  };

  const handleSearch = () => {
    const filteredAndSortedData = filterAndSortData(tableData);
    setFilteredData(filteredAndSortedData);
    localStorage.setItem('filteredData', JSON.stringify(filteredAndSortedData));
  };

  const calculateTopWord = (data) => {
    const wordCounts = data.reduce((acc, item) => {
      if (item.type !== 'Punctuation' && item.type !== 'Other') {
        acc[item.text] = (acc[item.text] || 0) + item.concordance;
      }
      return acc;
    }, {});

    const topWord = Object.keys(wordCounts).reduce((a, b) => (wordCounts[a] > wordCounts[b] ? a : b), '');

    return topWord;
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Box mb={4}>
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
        </Box>
        <Box display="flex">
          {!showTable ? (
            <Box flex="1" mr={4}>
              <Text fontSize="md" fontWeight="bold" color="#00693E">
                Choose another text from your electronic corpus:
              </Text>
              <Select placeholder="Select a text..." mb={4} onChange={handleTextSelect}>
                {texts.map((text) => (
                  <option key={text.id} value={text.id}>{text.title}</option>
                ))}
              </Select>
              <Textarea placeholder="" value={selectedTextContent} size="lg" minHeight="320px" mb={4} isReadOnly />
              <Button backgroundColor="#306aa3" width="400px" color="white" onClick={handleTokenize} isLoading={isLoading}>
                Tokenize
              </Button>
            </Box>
          ) : (
            <Box flex="1" mr={4}>
              <Box overflowX="auto" maxHeight="320px">
                <Table variant="simple" mb="30px">
                  <Thead position="sticky" top="0" bg="white" zIndex="1">
                    <Tr>
                      <Th color="#00693E" fontWeight="bold">Token</Th>
                      <Th color="#00693E" fontWeight="bold">Frequency</Th>
                      <Th color="#00693E" fontWeight="bold">Type</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredData.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.text}</Td>
                        <Td isNumeric>{item.concordance}</Td>
                        <Td>{item.type}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
              <InfoBox 
                numTokens={metadata.num_tokens} 
                totalOccurrences={metadata.num_occurrences} 
                topToken={metadata.top_token}
                topWord={metadata.top_word} 
              />
            </Box>
          )}
          <Box width="300px">
            <Box mb={4}>
              <Text mb={2}>Filter by part of speech:</Text>
              <Select placeholder="Select option" onChange={handlePartOfSpeechChange}>
                <option value="Noun">Noun</option>
                <option value="Verb">Verb</option>
                <option value="Adjective">Adjective</option>
                <option value="Adverb">Adverb</option>
                <option value="Pronoun">Pronoun</option>
                <option value="Preposition">Preposition</option>
                <option value="Conjunction">Conjunction</option>
                <option value="Interjection">Interjection</option>
                <option value="Article">Article</option>
              </Select>
            </Box>
            <Text mb={2}>Sort:</Text>
            <Box mb={4} borderWidth="1px" borderRadius="md" p={4} borderColor="gray.200">
              <RadioGroup onChange={handleSortOrderChange}>
                <Stack spacing={5} direction="column">
                  <Radio value="absolute">Alphabetically</Radio>
                  <Radio value="relative">By frequency rank</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box mb={4}>
              <Text mb={2}>Frequency range:</Text>
              <FrequencyRangeSlider onRangeChange={handleFrequencyRangeChange} />
            </Box>
            <Button onClick={handleSearch} backgroundColor="#306aa3" color="white" mb="15px" width="300px">
              Apply
            </Button>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Frequency;