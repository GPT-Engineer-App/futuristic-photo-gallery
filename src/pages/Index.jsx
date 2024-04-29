import { Box, Button, Flex, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react";
import { FaBars, FaCamera, FaPlus, FaUpload } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages([...images, e.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = () => {
    // Simulate image upload
    setImageUploading(true);
    setTimeout(() => {
      setImageUploading(false);
      onClose();
    }, 2000);
  };

  return (
    <Box>
      <Flex justifyContent="space-between" p="4" bg="gray.800" color="white" alignItems="center">
        <IconButton icon={<FaBars />} variant="outline" aria-label="Open Menu" />
        <Box fontSize="xl">Photo Gallery 2030</Box>
        <IconButton icon={<FaCamera />} variant="outline" aria-label="Upload" onClick={onOpen} />
      </Flex>

      <VStack spacing={4} p={4}>
        {images.map((img, index) => (
          <Image key={index} src={img} boxSize="100%" borderRadius="md" />
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload a Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={uploadImage} isLoading={imageUploading} leftIcon={<FaUpload />}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
