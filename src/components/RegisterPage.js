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

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match.",
        description: "Please check your passwords and try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
  
    try {
      const response = await fetch('http://138.68.107.72:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });
  
      if (response.status === 201) {
        toast({
          title: "Registration successful.",
          description: "You can now log in with your new account.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate('/login');
      } else {
        const data = await response.json();
        toast({
          title: "Registration failed.",
          description: data.detail || "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed.",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh" width="100%" align="center" justify="center" bg="#f0f4f8">
      <Box p="2%" maxWidth="25%" borderWidth={1} borderRadius="8px" boxShadow="lg" bg="white">
        <Box textAlign="center">
          <Flex alignItems="center" justify="center" marginBottom="1%">
            <FaChartBar color="#1f4c76" size="30px" style={{ marginRight: '1%' }} /> 
            <Heading color="#1f4c76" size="md">Register for QuanTA</Heading>
          </Flex>
          <Text fontSize="sm" color="gray.600" marginBottom="2%">Create your account</Text>
        </Box>
        <Box my="2%" textAlign="left">
          <form>
            <FormControl isRequired>
              <FormLabel fontSize="sm">First Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
                bg="gray.100"
                size="sm"
              />
            </FormControl>
            <FormControl mt="2%" isRequired>
              <FormLabel fontSize="sm">Last Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                bg="gray.100"
                size="sm"
              />
            </FormControl>
            <FormControl mt="2%" isRequired>
              <FormLabel fontSize="sm">Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                bg="gray.100"
                size="sm"
              />
            </FormControl>
            <FormControl mt="2%" isRequired>
              <FormLabel fontSize="sm">Password</FormLabel>
              <InputGroup size="sm">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  bg="gray.100"
                />
                <InputRightElement width="20%">
                  <Button h="1.75rem" size="xs" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mt="2%" isRequired>
              <FormLabel fontSize="sm">Confirm Password</FormLabel>
              <InputGroup size="sm">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  bg="gray.100"
                />
                <InputRightElement width="20%">
                  <Button h="1.75rem" size="xs" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button width="100%" mt="2%" backgroundColor="#1f4c76" color="white" _hover={{ bg: "#163d57" }} size="sm" fontSize="sm" onClick={handleRegister}>
              Register
            </Button>
          </form>
          <Text mt="2%" textAlign="center" fontSize="sm">
            Already have an account? <Link to="/login" style={{ color: "#1f4c76" }}>Sign in here</Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default RegisterPage;