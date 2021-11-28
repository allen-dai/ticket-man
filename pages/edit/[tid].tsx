import { useRouter } from "next/router"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Edit = () => {
    const router = useRouter();
    const { tid } = router.query;
    const [ticket, setTicket] = useState<any>();
    const toast = useToast();
    const [description, setDescription] = useState<string>();

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

    function onSubmit(e: any) {
        e.preventDefault();
        updateDoc(doc(db, "ticket", String(tid)), {
            description: description
        })
            .then(() => {
                toast({
                    title: "Ticket updated",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                })
                router.push("/tickets");
            })
            .catch((err) => {
                toast({
                    title: err,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                })
            });
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
        </Container>
    )
}

export default WithAuth(Edit);
