import React, { useState, useEffect } from "react";
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
  Select,
  HStack
} from "@chakra-ui/react";
import { FaPaperPlane, FaUpload, FaBook, FaPaste, FaBroom } from "react-icons/fa";

const TextGenerationPage = ({ setSharedText, setTextId }) => {
  const [uploadedText, setUploadedText] = useState(() => {
    return localStorage.getItem("uploadedText") || "";
  });

  const [title, setTitle] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState("");
  const [selectedLLM, setSelectedLLM] = useState("ChatGPT"); // New state for selected LLM

  useEffect(() => {
    localStorage.setItem("uploadedText", uploadedText);
  }, [uploadedText]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await readFile(file);
        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
        setTitle(fileNameWithoutExtension);
        setUploadedText(text);
        setSharedText(text);

        localStorage.removeItem("tableData");
        localStorage.removeItem("showTable");
        localStorage.removeItem("selectedPartOfSpeech");
        localStorage.removeItem("sortOrder");
        localStorage.removeItem("frequencyRange");
        localStorage.removeItem("filteredData");
        localStorage.removeItem("selectedTextId");
        localStorage.removeItem("selectedTextContent");
        localStorage.removeItem("metadata");
        localStorage.removeItem("shouldLoadState");
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleQuickPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUploadedText(text);
      setSharedText(text);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  const handleGenerateText = async () => {
    try {
      const response = await fetch(
        `http://138.68.107.72:8000/api/generate_text/?prompt=${encodeURIComponent(
          userMessage
        )}&model=${selectedLLM}`, // Passing the selected LLM model
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setGeneratedText(data.generated_text);
        setUploadedText(data.generated_text);
        setSharedText(data.generated_text);

        localStorage.removeItem("tableData");
        localStorage.removeItem("showTable");
        localStorage.removeItem("selectedPartOfSpeech");
        localStorage.removeItem("sortOrder");
        localStorage.removeItem("frequencyRange");
        localStorage.removeItem("filteredData");
        localStorage.removeItem("selectedTextId");
        localStorage.removeItem("selectedTextContent");
        localStorage.removeItem("metadata");
        localStorage.removeItem("shouldLoadState");
      } else {
        console.error("Error generating text:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveText = async () => {
    if (!title) {
      setModalMessage("You must enter a text title.");
      onOpen();
      return;
    }
    if (!uploadedText) {
      setModalMessage("You must add text content.");
      onOpen();
      return;
    }

    const textData = {
      title: title,
      content: uploadedText,
      user: localStorage.getItem("user_id"),
    };

    try {
      const response = await fetch(
        "http://138.68.107.72:8000/api/create_text/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(textData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Text saved successfully:", data.id);
        setTextId(data.id);
        setModalMessage("Text saved successfully to your electronic corpus.");
        onOpen();
      } else {
        const errorData = await response.json();
        console.error("Error saving text:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Flex flexDir="row" p={4} bg="white" borderRadius="10px">
      <Box flex="1" mr={4} w={{ base: "100%", md: "40%" }} mt={12}>
        <Stack align="center" spacing={5}>
          <Box w="80%" textAlign="left">
            <Heading
              as="h5"
              size="lg"
              color="#00693E"
              fontWeight="bold"
              fontStyle="italic"
              mb={6}
            >
              Local upload:
            </Heading>
            <Button
              as="label"
              htmlFor="fileInput"
              bg="#ffffff"
              borderWidth="3px"
              borderStyle="dashed"
              borderColor="#306aa3"
              borderRadius="12px"
              cursor="pointer"
              transition="border 0.3s ease-in-out"
              _hover={{ borderColor: "#306aa3" }}
              h="8vh"
              w="100%"
            >
              <FaUpload fontSize="2em" mb={2} color="#306aa3" />
              Click to Upload
            </Button>
            <Input
              hidden
              type="file"
              id="fileInput"
              accept=".txt"
              onChange={handleFileUpload}
            />
          </Box>
          <Divider
            orientation="horizontal"
            borderColor="#306aa3"
            borderWidth="1px"
            w="80%"
          />
          <Box w="80%" textAlign="left">
            <Heading
              as="h3"
              size="lg"
              color="#00693E"
              fontWeight="bold"
              fontStyle="italic"
            >
              Generate text using AI:
            </Heading>
            <Box>
              <Text
                fontSize="xl"
                color="#306aa3"
                fontWeight="bold"
                mb={1}
                mt={5}
              >
                Select Model:
              </Text>
              <Select
                value={selectedLLM}
                onChange={(e) => setSelectedLLM(e.target.value)}
                borderWidth="2px"
                borderRadius="8px"
                fontSize="xs"
                color="#495057"
                w="100%"
                borderColor="#306aa3"
                mb={3}
              >
                <option value="chatgpt">ChatGPT</option>
                <option value="llama">Llama</option>
                <option value="gemini">Gemini</option>
                <option value="claude">Claude</option>
                <option value="command">Command</option>
                <option value="qwen">Qwen</option>
                <option value="deepseek">DeepSeek</option>
              </Select>
            </Box>
            <Box>
              <Text fontSize="xl" color="#306aa3" fontWeight="bold" mb={1}>
                Prompt:
              </Text>
            </Box>
            <Flex alignItems="center">
              <Textarea
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                borderWidth="2px"
                borderRadius="8px"
                fontSize="xs"
                color="#495057"
                minHeight="30px"
                maxHeight="50px"
                rows={2}
                resize="none"
                w="100%"
                p={2}
                borderColor="#306aa3"
              />
              <Button
                bg="#306aa3"
                color="white"
                border="none"
                borderRadius="8px"
                p={2}
                ml={3}
                cursor="pointer"
                transition="background-color 0.2s"
                _hover={{ backgroundColor: "#0056b3" }}
                onClick={handleGenerateText}
              >
                <FaPaperPlane />
              </Button>
            </Flex>
          </Box>
          <Divider
            orientation="horizontal"
            borderColor="#306aa3"
            borderWidth="1px"
            w="80%"
          />
        </Stack>
      </Box>
      <Box w={{ base: "100%", md: "60%" }} ml={1} mt={1} mr={8}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading
            as="h3"
            size="lg"
            color="#00693E"
            fontWeight="bold"
            fontStyle="italic"
          >
            Text for Analysis
          </Heading>
          
            <Button
              onClick={handleSaveText}
              bg="#00693E"
              color="white"
              borderRadius="25px"
              _hover={{ bg: "#004d2e" }}
              p={3}
              w="auto"
              width="36%"
              height="6vh"
              leftIcon={<FaBook />}
              style={{ fontSize: "1em" }}
              ml={20}
            >
              Save text to electronic corpus
            </Button>
            <Button
              onClick={() => {
                setUploadedText("");
                setSharedText("");
                localStorage.removeItem("uploadedText");
                localStorage.removeItem("tableData");
                localStorage.removeItem("showTable");
                localStorage.removeItem("selectedPartOfSpeech");
                localStorage.removeItem("sortOrder");
                localStorage.removeItem("frequencyRange");
                localStorage.removeItem("filteredData");
                localStorage.removeItem("selectedTextId");
                localStorage.removeItem("selectedTextContent");
                localStorage.removeItem("metadata");
                localStorage.removeItem("shouldLoadState");
              }}
              bg="#D65A17"
              color="white"
              borderRadius="25px"
              _hover={{ bg: "#C05621" }}
              p={3}
              w="auto"
              width="20%"
              height="6vh"
              leftIcon={<FaBroom />}
            >
              Clear
            </Button>
        </Flex>
        <Flex alignItems="center" mt={4}>
          <Text fontSize="lg" color="#306aa3" fontWeight="bold" mr={3}>
            Title of the text:
          </Text>
          <Input
            placeholder="Enter text title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="sm"
            width="auto"
            flexGrow={1}
            padding="8px"
            borderRadius="8px"
          />
        </Flex>
        <Textarea
          placeholder="Your text here..."
          value={uploadedText}
          onChange={(e) => {
            setUploadedText(e.target.value);
            setSharedText(e.target.value);
            localStorage.removeItem("tableData");
            localStorage.removeItem("showTable");
            localStorage.removeItem("selectedPartOfSpeech");
            localStorage.removeItem("sortOrder");
            localStorage.removeItem("frequencyRange");
            localStorage.removeItem("filteredData");
            localStorage.removeItem("selectedTextId");
            localStorage.removeItem("selectedTextContent");
            localStorage.removeItem("metadata");
            localStorage.removeItem("shouldLoadState");
          }}
          height="60vh"
          resize="none"
          borderWidth="2px"
          borderColor="#306aa3"
          borderRadius="8px"
          fontSize="16px"
          color="#495057"
          overflowY="scroll"
          mt={4}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Notification</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{modalMessage}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default TextGenerationPage;
