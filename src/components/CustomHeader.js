import { FaChartBar } from 'react-icons/fa';
import {
    Heading, Box, Flex, Text, Link, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, useToast } from '@chakra-ui/react';

function CustomHeader({ setSharedText, setTextId, onLogout }) {
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = () => {
        localStorage.clear();

        setSharedText("");     
        setTextId(null);       

        toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        onLogout();
        navigate('/login');
    };
    return (
        <Heading alignItems='center' justifyContent='space-between' padding='10px' backgroundColor='#1f4c76' h='100px'>
            <Flex flexDir='row'>
                <Box w='35%' p={4} borderRadius='8px' color='white'>
                    <Flex align='center'>
                        <Box mt='2%' mr='3%'>
                            <FaChartBar className="app-logo" />
                        </Box>
                        <Text fontSize='4xl' fontWeight='bold' letterSpacing='wide'>
                            QuanTA
                        </Text>
                    </Flex>
                </Box>
                <Box w='65%' mt='2%' as="nav">
                    <Flex as="ul" listStyleType="none" m={0} p={0} ml='35%'>
                        <Box as="li" mr={30} >
                            <Link href="#home" color="white" textDecoration="none" onClick={(e) => {
                                e.preventDefault();
                                navigate('/home');
                            }}
                                fontSize='large'>
                                Home
                            </Link>
                        </Box>
                        <Box as="li" mr={30} >
                            <Link href="#tokenization" color="white" textDecoration="none" onClick={(e) => {
                                e.preventDefault();
                                navigate('/frek');
                            }}
                                fontSize='large'>
                                Tokenization
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
                                Statistics
                            </Link>
                        </Box>
                        <Box as="li" marginLeft={6}>
                            <Menu>
                                <MenuButton fontSize='large' as={Link} colorScheme='teal' variant='outline' color='white' ml={4}>
                                    Categories <ChevronDownIcon />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem fontSize='large' onClick={() => navigate('/categories')}>Manage Categories</MenuItem>
                                    <MenuItem fontSize='large' onClick={() => navigate('/categoriescompare')}>Compare Categories</MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                        <Box as="li" marginLeft={6}>
                            <Button
                                variant="outline"
                                borderColor="white"
                                color="white"
                                fontWeight="bold"
                                borderWidth="2px"
                                _hover={{ bg: 'white', color: '#1f4c76' }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Heading>
    );
}

export default CustomHeader;