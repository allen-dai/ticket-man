import {
  Box,
  Flex,
  Button,
  Modal,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  FormLabel,
  Tag,
  Text,
  UseDisclosureProps,
} from "@chakra-ui/react";
import { useState } from "react";

type TicketBoxProps = {
  onOpen: UseDisclosureProps;
  ticket: any;
}

const TicketBox = ({ onOpen, ticket }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Flex
      justifyContent="space-between"
      p={2}
      borderRadius="10px"
      alignItems="center"
      border="1px"
      borderColor="gray.400"
      bg="#36363940"
    >
      <Flex flexDir="column">
        <Text fontSize="xs">Priority</Text>
        <Tag variant="solid" colorScheme="red">
        {ticket?.priority}
        </Tag>
      </Flex>

      <Flex flexDir="column">
        <Text fontSize="xs">Description</Text>
        <Box>
          <Tag mx={1} colorScheme="orange">
        {ticket?.description}
          </Tag>
        </Box>
      </Flex>

      <Flex flexDir="column">
        <Text fontSize="xs">Created by</Text>
        <Tag>{ticket?.createdBy}</Tag>
      </Flex>

      <Flex flexDir="column">
        <Text fontSize="xs">Created at</Text>
        <Tag>{(ticket?.iat).toDate().toString()}</Tag>
      </Flex>

      <Flex flexDir="column">
        <Text fontSize="xs">Open for</Text>
        <Tag>Not created yet</Tag>
      </Flex>

      <Box>
        <Button
          onClick={() => {
            setLoading(!loading);
            if (onOpen) {
              onOpen();
            }
          }}
          colorScheme="blue"
        >
          View
        </Button>
        <Button isLoading={loading} ml={2} colorScheme="teal">
          Take
        </Button>
      </Box>
    </Flex>
  );
};

const TicketModal = ({ isOpen, onClose }: UseDisclosureProps) => {
  return (
    <Modal
      isCentered
      isOpen={isOpen as boolean}
      onClose={() => {
        if (onClose) {
          onClose();
        }
      }}
    >
      <ModalOverlay backgroundColor="blackAlpha.200" />
      <ModalContent boxShadow="lg">
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Body</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { TicketBox, TicketModal };
