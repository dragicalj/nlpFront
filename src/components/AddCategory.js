import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  Wrap,
  Flex
} from '@chakra-ui/react';
import { AnalysisContext } from './AnalysisContext';

const AddCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addedCategories, setAddedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const { selectedCategories, setSelectedCategories } = useContext(AnalysisContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://138.68.107.72:8000/api/categories/');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (selectedCategory && !addedCategories.includes(selectedCategory)) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
      setAddedCategories([...addedCategories, selectedCategory]);
      setSelectedCategory('');
    } else {
      toast({
        title: 'Error',
        description: 'The category has already been added!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleRemoveCategory = (category) => {
    setAddedCategories(addedCategories.filter((item) => item !== category));
    setSelectedCategories(selectedCategories.filter((item) => item !== category));
  };

  return (
    <Flex spacing={4} align="center" flexDir='row'>
      <Flex w='50%'>
        <FormControl id="add-category">
          <FormLabel fontSize="2xl">Add two or more categories:</FormLabel>
          <HStack>
            <Select
              placeholder="Select category"
              value={selectedCategory}
              onChange={handleSelectChange}
            >
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </Select>
            <Button bg="#306aa3" _hover={{ bg:"#f5f5f5" , color: 'black' }} color="white" onClick={handleAddCategory} width="300px" fontSize="xl">
              Add Category
            </Button>
          </HStack>
        </FormControl>
      </Flex>
      <Flex ml='3%' mt='3%'>
        <Wrap size="3xl">
          {addedCategories.map((category) => (
            <Tag size="xl" p={3} fontSize="xl" width="240px" key={category} borderRadius="full" variant="solid" bg="#00693E" m={1}>
              <TagLabel>{category}</TagLabel>
              <TagCloseButton marginLeft="auto" onClick={() => handleRemoveCategory(category)} />
            </Tag>
          ))}
        </Wrap>
      </Flex>
    </Flex>
  );
};

export default AddCategory;