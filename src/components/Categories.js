import React, { useState, useEffect } from 'react';
import { Flex, Heading, Button, Box, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Input, FormControl, FormLabel, Textarea, HStack } from '@chakra-ui/react';
import CategoryCard from './CategoryCard'; 

const Categories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [categories, setCategories] = useState([]);

  const userId = localStorage.getItem('user_id');

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://138.68.107.72:8000/api/categories_with_text_count/?userId=${userId}`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
  const handleNewCategory = async () => {
    const newCategory = {
      name: newCategoryName,
      description: newCategoryDescription
    };
    try {
      const response = await fetch('http://138.68.107.72:8000/api/create_category/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        const data = await response.json();
        setCategories([...categories, data]);
        onClose(); 
        setNewCategoryName('');
        setNewCategoryDescription('');
        fetchCategories();
      } else {
        const errorData = await response.json();
        console.error('Error creating category:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Heading size="lg" textAlign="left" mt={3} ml={10} style={{ fontStyle: 'italic', color: "#1f4c76", fontSize: "40px" }} mb="0">
        Our Categories:
      </Heading>
      <Box  as="section" overflowX="scroll"  display="flex" sx={{ '&::-webkit-scrollbar': { display: 'block', height: '5px',marginTop: '-8px'}, '&::-webkit-scrollbar-thumb': { background: '#1f4c76', borderRadius: '4px'} }} p={5}>
        <Flex direction="row" gap="20px" maxHeight="340px">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              categoryId={category.id}
              name={category.name}
              description={category.description}
              numberOfTexts={category.text_count}
              onAddText={fetchCategories}
              onEdit={fetchCategories}
            />
          ))}
        </Flex>
      </Box>
      <Flex direction="row">
        <Heading mt={3} size="lg" textAlign="left"  ml={10} style={{ fontStyle: 'italic', color: "#1f4c76", fontSize: "40px" }}>
          Want to create a new category?
        </Heading>
      <Box mt={4} mb={10} align="center">
        <Button onClick={onOpen} bg="#1f4c76" _hover={{ bg:"#f5f5f5", color: 'black' }} color="white" borderRadius="10px" height='40px' width="330px" fontSize="15px" ml={45} mr={1}  style={{ fontStyle: 'italic' }}>Create new category</Button>
      </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new category</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="6">
            <FormControl mb="4">
              <FormLabel>Name:</FormLabel>
              <Input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Enter category name" />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Description:</FormLabel>
              <Textarea value={newCategoryDescription} onChange={(e) => setNewCategoryDescription(e.target.value)} placeholder="Describe what this category is about" />
            </FormControl>
            <Button onClick={handleNewCategory} bg="#1f4c76" color="white" mt="4">Create</Button>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
};

export default Categories;