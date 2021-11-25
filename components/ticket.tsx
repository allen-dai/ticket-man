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
    useDisclosure,
    UseDisclosureProps,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons"
import { useState, useRef } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useUserContext } from "../lib/firebaseHook";

const TicketBox = ({ id, ticket, type }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);
    const alertOnClose = () => setAlert(false);
    const alertCancelRef = useRef();
    const { user } = useUserContext();
    const [querySucc, setQuerySucc] = useState<boolean>(false);
    const toast = useToast();

    const priorityColor = {
        high: "red",
        medium: "orange",
        low: "blue",
    };
    const typeColor = {
        Take: "teal",
        Delete: "red",
    };

    let createDate = ticket.iat.toDate().toString().split(" ");
    createDate = createDate.slice(0, 5).toString().replaceAll(",", " ");

    let timeDiff = new Date().getTime() - ticket.iat.toDate().getTime();

    function msToTime(duration: number) {
        let seconds: number | string = Math.floor((duration / 1000) % 60);
        let minutes: number | string = Math.floor(
            (duration / (1000 * 60)) % 60
        );
        let hours: number | string = Math.floor(
            (duration / (1000 * 60 * 60)) % 24
        );

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return hours + "h : " + minutes + "m : " + seconds + "s";
    }

    function Query() {
        if (type === "Take") {
            return updateDoc(doc(db, "ticket", id), {
                takenBy: user.uid,
                status: "In Progess"
            });
        }
        else {
            return deleteDoc(doc(db, "ticket", id));
        }
    }

    function showToast(status:boolean){
        let toastContent = {};
        if (status){
            toastContent = {
                title: type==="Take" ? "Ticket assigned" : "Ticket deleted",
                description: type==="Take" ? "We've assigned the ticket to you" : "Ticket successfully deleted",
                status: "success",
                duration: 4000,
                isClosable: true,
            };
        }
        else{
            toastContent = {
                title: "Request failed",
                status: "error",
                duration: 4000,
                isClosable: true,
            };
        }
        toast(toastContent);
    }

    function startQuery() {
        setLoading(true);
        Query()
            .then(() => {
                setLoading(false);
                setQuerySucc(true);
                showToast(true);
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
                showToast(false);
            });
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
                <Tag
                    variant="solid"
                    colorScheme={
                        //@ts-ignore
                        ticket ? priorityColor[ticket.priority] : ""
                    }
                >
                    {ticket.priority}
                </Tag>
            </Flex>

            <Flex flexDir="column">
                <Text fontSize="xs">Description</Text>
                <Box>
                    <Tag mx={1} colorScheme="orange">
                        {ticket.description}
                    </Tag>
                </Box>
            </Flex>

            <Flex flexDir="column">
                <Text fontSize="xs">Created by</Text>
                <Tag>{ticket.createdBy}</Tag>
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
                        if (onOpen) {
                            onOpen();
                        }
                    }}
                    colorScheme="blue"
                >
                    View
                </Button>
                {(!querySucc) ?
                    <Button
                        isLoading={loading}
                        ml={2}
                        colorScheme={
                            //@ts-ignore
                            typeColor[type]
                        }
                        onClick={() => { setAlert(true) }}
                    >
                        {type}
                    </Button>
                    :
                    <IconButton aria-label="success" icon={<CheckIcon />} colorScheme="green" mx={2} />
                }
            </Box>
            <TicketModal isOpen={isOpen} onClose={onClose} content={ticket.description} />
            <Alert isOpen={alert} onClose={alertOnClose} cancelRef={alertCancelRef} type={type} query={startQuery} />
        </Flex>
    );
};

const TicketModal = ({ isOpen, onClose, content }: any) => {
    return (
        <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent boxShadow="lg">
                <ModalHeader>Quick view</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>{content}</ModalBody>

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

const Alert = ({ onClose, isOpen, cancelRef, type, query }: any) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {type}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can not undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme={type === "Take" ? "teal" : "red"} onClick={() => { query(); onClose() }} ml={3}>
                            {type}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export { TicketBox };
