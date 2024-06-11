import React, { useState, useEffect } from 'react';
import {
  Flex, Heading, Button, Box, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, useDisclosure
} from '@chakra-ui/react';
import { Scatter } from 'react-chartjs-2';
import WordCloud from 'react-wordcloud';
import AddCategory from './AddCategory';
import CheckCriteria from './CheckCriteria';
import ResultTable from './ResultTable';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const CompareCategories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isWordCloudOpen, onOpen: onWordCloudOpen, onClose: onWordCloudClose } = useDisclosure();
  const [scatterData, setScatterData] = useState([]);
  const [wordCloudData, setWordCloudData] = useState([]);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchScatterData = async () => {
      try {
        const response = await fetch(`http://138.68.107.72:8000/api/shannon_equitability/${userId}/`);
        const data = await response.json();
        setScatterData(data);
      } catch (error) {
        console.error('Error fetching scatter data:', error);
      }
    };

    const fetchWordCloudData = async () => {
      try {
        const response = await fetch(`http://138.68.107.72:8000/api/frequent_nouns/${userId}/`);
        const data = await response.json();
        setWordCloudData(data);
      } catch (error) {
        console.error('Error fetching word cloud data:', error);
      }
    };

    fetchScatterData();
    fetchWordCloudData();
  }, [userId]);

  const generateRandomOffset = () => (Math.random() - 0.5) * 0.1;

  const prepareScatterPlotData = () => {
    const categories = [...new Set(scatterData.map(item => item.category))];
    return categories.map((category, index) => {
      const categoryData = scatterData.filter(item => item.category === category);
      return {
        label: category,
        data: categoryData.map(item => ({
          x: index + generateRandomOffset(),
          y: item.shannon_value
        })),
        backgroundColor: ['red', 'green', 'blue'][index % 3],
        borderColor: ['red', 'green', 'blue'][index % 3],
        pointStyle: 'crossRot',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBorderWidth: 2
      };
    });
  };

  const data = {
    datasets: prepareScatterPlotData()
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        ticks: {
          display: false 
        },
        title: {
          display: true,
          text: 'Category'
        }
      },
      y: {
        beginAtZero: false,
        min: 0.7, 
        max: 1, 
        title: {
          display: true,
          text: "Shannon’s Equitability"
        },
        ticks: {
          stepSize: 0.02 
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw.y}`;
          }
        }
      }
    }
  };

  const wordCloudOptions = {
    rotations: 2,
    rotationAngles: [0, 90],
    fontSizes: [20, 60],
    fontWeight: 'bold',
    fontFamily: 'Arial',
    enableTooltip: true,
    deterministic: true,
  };

  const wordCloudCallbacks = {
    getWordColor: word => word.color,
  };

  return (
    <Box>
      <Box w='100%' p={4}>
        <AddCategory />
      </Box>

      <Flex direction='row' mt={4}>
        <Box w='25%' p={1} ml={3}>
          <CheckCriteria />
          <Box border="1px solid #CBD5E0" borderRadius="md" p={4} mb={4}>
            <Heading as="h3" size="s" mb={1}>Visualize data:</Heading>
            <Flex direction="column">
              <Button onClick={onOpen} bg="#306aa3" _hover={{ bg: "#f5f5f5", color: 'black' }} color="white" mb={2} height="25px">Scatter plot</Button>
              <Button onClick={onWordCloudOpen} bg="#306aa3" _hover={{ bg: "#f5f5f5", color: 'black' }} color="white" height="25px">Word cloud</Button>
              <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent mt="10%">
                  <ModalHeader>Scatter Plot</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Scatter data={data} options={options} />
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Modal isOpen={isWordCloudOpen} onClose={onWordCloudClose} size="xl">
                <ModalOverlay />
                <ModalContent mt="10%">
                  <ModalHeader>Word Cloud</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <WordCloud words={wordCloudData} options={wordCloudOptions} callbacks={wordCloudCallbacks} />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Flex>
          </Box>
        </Box>

        <Flex direction='column' w='75%' pl={4}>
          <ResultTable />
        </Flex>
      </Flex>
    </Box>
  );
};

export default CompareCategories;