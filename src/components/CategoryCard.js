import React, { useState, useEffect } from 'react';
import {
  Box, VStack, Divider, Heading, Text, Input, Button, HStack, IconButton, Spacer,
  Modal, ModalContent, ModalHeader, ModalBody, ModalOverlay, ModalCloseButton, FormControl, FormLabel, Textarea,Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Select, ChakraProvider, useToast
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const CategoryCard = ({ categoryId, name, description, numberOfTexts, onViewTexts, onEdit, onDelete, onAddText  }) => {
  const { isOpen: isOpenTexts, onOpen: onOpenTexts, onClose: onCloseTexts } = useDisclosure();
  const { isOpen: isOpenAddText, onOpen: onOpenAddText, onClose: onCloseAddText } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

  const [texts, setTexts] = useState([]);
  const [userTexts, setUserTexts] = useState([]);

  const userId = localStorage.getItem('user_id');

  const [selectedTextId, setSelectedTextId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState(name);
  const [editCategoryDescription, setEditCategoryDescription] = useState(description);
  const toast = useToast();

  useEffect(() => {
    if (isOpenTexts) {
      fetchTexts();
    }
  }, [isOpenTexts]);

  useEffect(() => {
    if (isOpenAddText) {
      fetchUserTexts();
    }
  }, [isOpenAddText]);

  useEffect(() => {
    if (isOpenEdit) {
      setEditCategoryName(name);
      setEditCategoryDescription(description);
    }
  }, [isOpenEdit, name, description]);

  const fetchTexts = async () => {
    try {
      const response = await fetch(`http://138.68.107.72:8000/api/categories/${categoryId}/texts/?userId=${userId}`);
      const data = await response.json();
      setTexts(data);
    } catch (error) {
      console.error('Error fetching texts:', error);
    }
  };

  const fetchUserTexts = async () => {
    try {
      const response = await fetch(`http://138.68.107.72:8000/api/user_texts/${userId}/`);
      const data = await response.json();
      setUserTexts(data);
    } catch (error) {
      console.error('Error fetching user texts:', error);
    }
  };

  const handleAddText = async () => {
    if (!selectedTextId) {
      toast({
        title: "No text selected.",
        description: "Please select a text to add.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('http://138.68.107.72:8000/api/add_text_to_category/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text_id: selectedTextId, category_id: categoryId }),
      });

      if (response.ok) {
        toast({
          title: "Text added to category.",
          description: "The text has been successfully added to the category.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onCloseAddText();
        fetchTexts(); 
        if (onAddText) onAddText();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error adding text.",
          description: errorData.detail,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: "An error occurred while adding the text.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await fetch(`http://138.68.107.72:8000/api/categories/${categoryId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editCategoryName, description: editCategoryDescription }),
      });

      if (response.ok) {
        toast({
          title: "Category updated.",
          description: "The category has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onCloseEdit();
        if (onAddText) onAddText(); 
      } else {
        const errorData = await response.json();
        toast({
          title: "Error updating category.",
          description: errorData.detail,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: "An error occurred while updating the category.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const boxStyles = {
    borderWidth: "4px",
    borderColor: "#1f4c76",
    borderRadius: "16px",
    p: 2,
    m: "0 auto",
    boxShadow: "lg",
    bg: "white",
    borderStyle: 'solid',
    height: "440px",  
    overflowY: "auto" 
  };

  return (
    <Box style={boxStyles} width="300px" maxHeight="100%" ml={3}>
      <VStack spacing={2} align="stretch" p={1} height="100%">
        <Heading as="h3" fontSize="25px" borderBottomWidth="2px" mt={2} mb={1} color="#00693E" ml={3} mr={3}>
          {name}
        </Heading>
        <Divider bg="#1f4c76" borderWidth="3px" height="3px" width="95%"/>
        <Text fontSize="xs" ml={3} mr={3} style={{ fontStyle: 'italic' }}>{description}</Text>
        <Spacer />  
        <HStack spacing={1} ml={3} alignItems="center">
          <Text fontSize="md">Number of texts:</Text>
          <Input isReadOnly  value={numberOfTexts?.toString() || '0'}  padding="4px" width="40px" height="28px" fontSize="14px" borderColor="#00693E" borderWidth="2px" borderRadius="8px" marginLeft="10px" />
        </HStack>
        <Box>
          <Button onClick={onOpenTexts} bg="#00693E" _hover={{ bg: "#f5f5f5", color: 'black' }}  color="white"  borderRadius="10px" height='28px' width="90%" fontSize="14px" ml={2} mr={2} style={{ fontStyle: 'italic' }}>Show category texts</Button>
          <Modal isOpen={isOpenTexts} onClose={onCloseTexts} isCentered>
            <ModalOverlay />
            <ModalContent
              mt='8%'
              ml='26%'
              width="1000px"
              maxWidth="51%"
              h='75%'
              border="2px solid #1f4c76"
              borderRadius='7px'
              backgroundColor='#f5f5f5'
            >
              <ModalHeader
                color="#306aa3"
                fontSize="30px"
                fontWeight="bold"
                ml='35%'

              >

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
                />
              </ModalHeader>
              <ModalBody p="6">
                <Box overflowX="auto">
                  <Table variant="simple" width="95%" size="md" colorScheme="teal" borderRadius="lg" overflow="hidden" borderWidth="2px" borderColor="#e2e8f0">
                    <Thead>
                      <Tr borderBottom="5px solid #3182ce">
                        <Th width="40%" borderBottom="1px solid #1f4c76" borderColor="#009966" textAlign="center">Text title</Th>
                        
                      </Tr>
                    </Thead>
                    <Tbody>
                      {texts.map((text) => (
                        <Tr key={text.id}>
                          <Td textAlign="center" borderColor="#e2e8f0" py={3}>{text.title}</Td>
                          
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </ModalBody>

            </ModalContent>
          </Modal>
        </Box>
        <Box>
          <Button onClick={onOpenAddText} bg="#00693E" color="white" _hover={{ bg: "#f5f5f5", color: 'black' }} borderRadius="10px" height='28px' width="90%" fontSize="14px" ml={2} mr={2} style={{ fontStyle: 'italic' }}>Add new text</Button>
          <Modal isOpen={isOpenAddText} onClose={onCloseAddText} isCentered>
            <ModalOverlay />
            <ModalContent
              mt='10%'
              w="800px"
              maxWidth="800px"
              h='330px'
              border="2px solid #1f4c76"
              borderRadius='7px'
            >
              <ModalHeader
                color="#306aa3"
                fontSize="25px"
                fontWeight="bold"
                mt="50px"
              >
                Select the text you want to add to this category:
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
                />
              </ModalHeader>
              <ModalBody
                p="6"
              >
                <Select placeholder="Select option" width="100%" size="lg" sx={{ fontSize: "16px", height: "48px" }} onChange={(e) => setSelectedTextId(e.target.value)}>
                  {userTexts.map((text) => (
                    <option key={text.id} value={text.id}>{text.title}</option>
                  ))}
                </Select>
                <Button bg="#1f4c76" color="white" mt={4} borderRadius="10px" height='40px' width="full" fontSize="15px" style={{ fontStyle: 'italic' }} onClick={handleAddText}>Add text </Button>

              </ModalBody>
            </ModalContent>
          </Modal>

        </Box>
        <HStack spacing={1} justify="end" pr={2}>
          <IconButton
            icon={<EditIcon w={21} h={21} />}
            size="md"
            colorScheme="blue"
            onClick={onOpenEdit}
            aria-label="Edit Category"
          />
          
        </HStack>
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit category</ModalHeader>
            <ModalCloseButton />
            <ModalBody p="6">
              <FormControl mb="4">
                <FormLabel>Name:</FormLabel>
                <Input value={editCategoryName} onChange={(e) => setEditCategoryName(e.target.value)} placeholder="Enter category name" />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Description:</FormLabel>
                <Textarea value={editCategoryDescription} onChange={(e) => setEditCategoryDescription(e.target.value)} placeholder="Describe what this category is about" />
              </FormControl>
              <Button onClick={handleUpdateCategory} bg="#1f4c76" color="white" mt="4">Update</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default CategoryCard;