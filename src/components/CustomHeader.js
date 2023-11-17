import React, { useState } from 'react';
import { FaChartBar } from 'react-icons/fa'; // Importing a chart icon
import { Heading, Box, Flex, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useHistory


function CustomHeader() {
    const navigate = useNavigate(); // Create a history object
  const [showStatisticalAnalysis, setShowStatisticalAnalysis] = useState(false);

  return (
    <Heading alignItems='center' justifyContent='space-between' padding='10px' backgroundColor='#1f4c76' h='80px'>
        <Flex flexDir='row'>
        <Box w='50%' p={4} borderRadius='8px' color='white'>
            <Flex align='center'>
                <Box mt='2%' mr='3%'>
                    <FaChartBar className="app-logo" />
                </Box>
                    <Text fontSize='4xl' fontWeight='bold' letterSpacing='wide'>
                        Quantitative Text Analysis
                    </Text>
            </Flex>
        </Box>
        <Box w='50%' mt='2%' as="nav">
        <Flex as="ul" listStyleType="none" m={0} p={0} ml='15%'>
            <Box as="li" mr={30} >
                <Link href="#tokenization" color="white" textDecoration="none" onClick={(e) => {
                        e.preventDefault();
                        navigate('/frek'); 
                    }}
                    fontSize='large'>
                    Tokenization
                </Link>
            </Box>
            <Box as="li" mr={30} >
                <Link href="#tokenFrequency" color="white" textDecoration="none" fontSize='large'>
                    Token Frequency Analysis
                </Link>
            </Box>
            <Box as="li">
                <Link
                    href="#/"
                    color="white"
                    textDecoration="none"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/statistics'); 
                    }}
                    fontSize='large'
                >
                    Statistical Text Analysis
                </Link>
            </Box>
        </Flex>
        </Box>
        </Flex>
    </Heading>
  );
}

export default CustomHeader;