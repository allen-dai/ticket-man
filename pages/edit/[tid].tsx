import { useRouter } from "next/router"
import { doc, getDoc, updateDoc, increment, addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useState, useEffect, useRef } from "react";
import WithAuth from "../../components/withAuth";
import {
    Heading,
    Container,
    Button,
    Input,
    Textarea,
    SimpleGrid,
    useToast,
    FormControl,
    FormHelperText,
    Flex,
    Spacer,
    useDisclosure,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Alert } from "../../components/ticket";

const Edit = () => {
    const router = useRouter();
    const { tid } = router.query;
    const [ticket, setTicket] = useState<any>();
    const toast = useToast();
    const [description, setDescription] = useState<string>();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();


    let fetched = false;
    useEffect(() => {
        async function getTicket() {
            const docRef = doc(db, "ticket", String(tid))
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTicket(data);
                setDescription(data.description);
            }
            else {
                toast({
                    title: "Ticket does not exist",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
                router.push("/tickets")
            }
        }
        if (tid) {
            if (!fetched) {
                getTicket();
                fetched = true;
            }
        }
    }, [tid])

    function update_doc(content: any) {
        updateDoc(doc(db, "ticket", String(tid)), content)
            .then(() => {
                toast({
                    title: "Ticket updated",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                })
                //@ts-ignore push old data to its subcollection
                addDoc(collection(db, "ticket", String(tid), "history"),
                    ticket
                );


                //@ts-ignore update version 
                updateDoc(doc(db, "ticket", tid), {
                    version: increment(1)
                });

                router.push("/tickets");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function onSubmit(e: any) {
        e.preventDefault();
        update_doc({ description: description });
    }

    function closeTicket() {
        update_doc({ description: description, status: "Closed" });
    }

    return (
        <Container maxW="container.md" mt={20}>
            <Heading>Edit Ticket</Heading>
            <form onSubmit={onSubmit}>
                <SimpleGrid gap={4} mt={4}>
                    <FormControl>
                        <FormHelperText my={1}>Description</FormHelperText>
                        <Textarea
                            height="200px"
                            placeholder="Description"
                            isRequired
                            resize="none"
                            defaultValue={ticket?.description}
                            onChange={(e) => { setDescription(e.currentTarget.value) }}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="green"
                        rightIcon={<ArrowForwardIcon />}
                    >
                        Commit
                    </Button>
                </SimpleGrid>
            </form>

            <Flex mt={5}>
                <Spacer />
                <Button
                    colorScheme="red"
                    onClick={onOpen}
                >
                    CLOSE
                </Button>
                <Alert isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} type="Close" query={closeTicket} />
            </Flex>

        </Container>
    )
}

export default WithAuth(Edit);
