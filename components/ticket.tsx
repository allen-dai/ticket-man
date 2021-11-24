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

const TicketBox = ({ onOpen, ticket, action }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const priorityColor = {
    "high": "red",
    "medium": "orange",
    "low": "blue"
  }
  const actionType = {
    "Take": "teal",
    "Delete": "red"
  }

  let createDate = ticket?.iat.toDate().toString().split(" ")
  createDate = createDate.slice(0, 5).toString().replaceAll(",", " ")

  let timeDiff = (new Date()).getTime() - ticket?.iat.toDate().getTime()

  function msToTime(duration:number) {
    let seconds:number|string = Math.floor((duration / 1000) % 60)
    let minutes:number|string  = Math.floor((duration / (1000 * 60)) % 60)
    let hours:number|string  = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + "h : " + minutes + "m : " + seconds + "s";
  }


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
        <Tag variant="solid" colorScheme={
          //@ts-ignore
          ticket ? priorityColor[ticket.priority] : ""}>
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
        <Tag>{createDate}</Tag>
      </Flex>

      <Flex flexDir="column">
        <Text fontSize="xs">Open for</Text>
        <Tag>{msToTime(timeDiff)}</Tag>
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
        <Button isLoading={loading} ml={2} colorScheme={
          //@ts-ignore
          actionType[action]}>
          {action}
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
