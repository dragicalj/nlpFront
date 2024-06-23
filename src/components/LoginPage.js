import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Flex,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Heading,
  useToast,
  Text
} from '@chakra-ui/react';
import { FaChartBar } from 'react-icons/fa'; 
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://138.68.107.72:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('user_id', data.id);
        console.log('User ID:', data.id); 
        localStorage.removeItem('tableData');
        localStorage.removeItem('showTable');
        localStorage.removeItem('selectedPartOfSpeech');
        localStorage.removeItem('sortOrder');
        localStorage.removeItem('frequencyRange');
        localStorage.removeItem('filteredData');
        localStorage.removeItem('selectedTextId');
        localStorage.removeItem('selectedTextContent');
        localStorage.removeItem('metadata');
        localStorage.removeItem('shouldLoadState');
        toast({
          title: "Login successful.",
          description: "Welcome back!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onLogin();
        navigate('/home');
      } else {
        const data = await response.json();
        toast({
          title: "Login failed.",
          description: data.detail || "Invalid credentials.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh" width="100%" align="center" justify="center" bg="#f0f4f8">
      <Box p="2%" minWidth="30%" maxWidth="80%" borderWidth={1} borderRadius="8px" boxShadow="lg" bg="white">
        <Box textAlign="center">
          <Flex alignItems="center" justify="center" marginBottom="1%">
            <FaChartBar color="#1f4c76" size="40px" style={{ marginRight: '2%' }} /> 
            <Heading color="#1f4c76" size="lg">Welcome to QuanTA</Heading>
          </Flex>
          <Text fontSize="md" color="gray.600" marginBottom="3%">Please sign in to continue</Text>
        </Box>
        <Box my="2%" textAlign="left" >
          <form>
            <FormControl isRequired>
              <FormLabel fontSize="md">Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                bg="gray.100"
                size="md"
              />
            </FormControl>
            <FormControl mt="3%" isRequired>
              <FormLabel fontSize="md">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  bg="gray.100"
                />
                <InputRightElement width="20%">
                  <Button h="2rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button width="100%" mt="3%" backgroundColor="#1f4c76" color="white" _hover={{ bg: "#163d57" }} size="md" fontSize="md" onClick={handleLogin}>
              Sign in
            </Button>
          </form>
          <Text mt="2%" textAlign="center">
            Don't have an account? <Link to="/register" style={{ color: "#1f4c76" }}>Register here</Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginPage;


