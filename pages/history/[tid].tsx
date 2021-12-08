import { useRouter } from "next/router"
import { doc, getDoc, updateDoc, increment, addDoc, collection } from "firebase/firestore";
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
    Box,
    Flex,
    Spacer,
    IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon, RepeatIcon } from "@chakra-ui/icons";
import { QueryTicketHistory } from "../../query/ticket";
import { TicketBox } from "../../components/ticket";

const History = () => {
    const router = useRouter();
    const { tid } = router.query;
    const [tickets, setTickets] = useState<any>();

    let fetched = false;
    useEffect(() => {
        if (tid) {
            if (!fetched) {
                getTicket();
                fetched = true;
            }
        }
    }, [tid])

    function getTicket() {
        QueryTicketHistory(String(tid))
            .then((docs) => {
                setTickets(docs);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    let ticketHistory: any = [];
    let toSort:any = {};
    if (tickets) {
        tickets.forEach((ticket: any) => {
            toSort[ticket.data().version] = (
                <Box key={ticket.id}>
                    <Heading fontSize="lg" >Version: {ticket.data().version}</Heading>
                    <TicketBox
                        ticket={ticket.data()}
                        type="History"
                        id={ticket.id}
                    />
                </Box>
            );
        });
        ticketHistory = Object.values(toSort)
    }

    return (
        <Box width="100%" p="3em" mt={10}>
            <SimpleGrid gap={2} spacing={5} borderRadius="10px">
                <Flex>
                    <Heading>Ticket history</Heading>
                    <Spacer />
                    <IconButton
                        aria-label="refresh"
                        colorScheme="blue"
                        variant="outline"
                        icon={<RepeatIcon />}
                        onClick={() => getTicket()}
                    />
                </Flex>
                {ticketHistory}
                {ticketHistory.length < 1 ? "Empty" : null}
            </SimpleGrid>
        </Box>
    )
}
export default WithAuth(History);
