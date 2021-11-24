import WithAuth from "../components/withAuth";
import type { NextPage } from "next";
import { Heading, Box, SimpleGrid, useDisclosure, Flex, IconButton, Spacer, Button} from "@chakra-ui/react";
import { RepeatIcon, AddIcon} from "@chakra-ui/icons";
import { QueryUserTickets } from "../query/ticket";
import { TicketBox, TicketModal } from "../components/ticket";
import { useState, useEffect } from "react";
import { useUserContext } from "../lib/firebaseHook";
import Link from "next/link";

const Tickets: NextPage = () => {
  const { user, loading } = useUserContext();
  const [tickets, setTickets] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //This make sure it only query when firebase is done loading/auth*ing the user.
  useEffect(() => {
    if (!loading && user) {
      //Getting tickets that are open and not created by the user and has a limit of 10 documents
      //@ts-ignore
      getTicket();
    }
  }, [loading]);

  function getTicket() {
    QueryUserTickets(10, user.uid)
      .then((docs) => {
        setTickets(docs)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let openTickets: any = [];
  tickets?.forEach((ticket: any) => {
    openTickets.push(
      <Box key={ticket.id}>
        <TicketBox onOpen={onOpen} ticket={ticket.data()} action="Delete"/>
      </Box>
    );
  });


  return (
    <Box width="100%" p="3em" mt={10}>

      <Link href="/createticket">
        <Button colorScheme="teal" rightIcon={<AddIcon />} mb={5}>Create</Button>
      </Link>
      <SimpleGrid
        gap={2}
        spacing={5}
        borderRadius="10px"
      >
        <Flex>
          <Heading>Pending Tickets</Heading>
          <Spacer />
          <IconButton aria-label="refresh" colorScheme="blue" variant="outline" icon={<RepeatIcon />} onClick={() => getTicket()} />
        </Flex>
        {openTickets}
        <TicketModal onClose={onClose} isOpen={isOpen} />
      </SimpleGrid>
    </Box>
  );
};

export default WithAuth(Tickets);
