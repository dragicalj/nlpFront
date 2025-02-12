import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  Spinner
} from '@chakra-ui/react';
import { FaPaperPlane, FaUpload, FaBook } from 'react-icons/fa';


const TextValidationModule = ({ uploadedText,setUploadedText, setSharedText }) => {
    const [offensiveWords, setOffensiveWords] = useState(false);
    const [grammarErrors, setGrammarErrors] = useState(false);
    const [spellingErrors, setSpellingErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [isFixing, setIsFixing] = useState(false);
  
    const handleValidateText = async () => {
        if (!uploadedText) {
          alert("No text to validate!");
          return;
        }
    
        setIsLoading(true);
        try {
            const response = await fetch("http://138.68.107.72:8000/api/validate_text/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: uploadedText }),
            });
        
            if (!response.ok) {
              const errorText = await response.text();
              console.error("Error validating text:", errorText);
              return;
            }
        
            const data = await response.json();
            console.log("Validation result:", data);
        
            setOffensiveWords(data.offensive);
            setGrammarErrors(data.grammar);
            setSpellingErrors(data.spelling);
          } catch (error) {
            console.error("Network error:", error);
          }finally {
            setIsLoading(false); 
          }
        };
  
        const handleFixErrors = async () => {
            if (!uploadedText) {
              alert("No text to fix!");
              return;
            }
            setIsFixing(true);
            try {
              const response = await fetch("http://138.68.107.72:8000/api/fix_text_errors/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  text: uploadedText,
                  fix_spelling: spellingErrors,
                  fix_grammar: grammarErrors,
                  fix_profanity: offensiveWords,
                }),
              });
          
              if (!response.ok) {
                console.error("Error fixing text:", await response.text());
                return;
              }
          
              const data = await response.json();
              console.log("Fixed text:", data.fixed_text);
          
              setUploadedText(data.fixed_text);
              setSharedText(data.fixed_text);
              setOffensiveWords(false);
              setGrammarErrors(false);
              setSpellingErrors(false);
            } catch (error) {
              console.error("Network error:", error);
            }finally {
                setIsFixing(false);
            }
          };
  
    return (
        <Box mt={2} p={4} border="1px solid #ccc" borderRadius="8px" bg="white">
  
  <Flex justifyContent="space-between" alignItems="center" mb={4}>
    <Checkbox
      isChecked={offensiveWords}
      isReadOnly
      colorScheme="red"
      size="lg"
    >
      Profanity detected
    </Checkbox>
    <Checkbox
      isChecked={grammarErrors}
      isReadOnly
      colorScheme="red"
      size="lg"
    >
      Grammar errors detected
    </Checkbox>
    <Checkbox
      isChecked={spellingErrors}
      isReadOnly
      colorScheme="red"
      size="lg"
    >
      Spelling errors detected
    </Checkbox>
  </Flex>
  <Flex justifyContent="center" gap={4}>
    <Button
      onClick={handleValidateText}
      bg="#306aa3"
      color="white"
      _hover={{ bg: '#004d2e' }}
      borderRadius="8px"
      width="150px"
      height="40px"
      fontSize="14px"
      isDisabled={isLoading}
    >
       {isLoading ? <Spinner size="sm" /> : "Validate text"} 
    </Button>
    <Button
      onClick={handleFixErrors}
      bg="#306aa3"
      color="white"
      _hover={{ bg: '#004d2e' }}
      borderRadius="8px"
      width="150px"
      height="40px"
      fontSize="14px"
      isDisabled={isFixing}
    >
         {isFixing ? <Spinner size="sm" /> : "Fix errors"} 
    </Button>
  </Flex>
</Box>
    );
  };

export default TextValidationModule;