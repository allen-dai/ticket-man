import WithAuth from "../components/withAuth";
import type { NextPage } from "next";
import { Heading, Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";

import { QueryOpenTickets } from "../components/ticket-query";
import { TicketBox, TicketModal } from "../components/ticket";

import { useState, useEffect } from "react";
import { useUserData } from "../lib/firebaseHook";

import { LineChart } from "../components/chart";

const Dashboard: NextPage = () => {
  const { user, loading } = useUserData();
  const [tickets, setTickets] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //This make sure it only query when firebase is done loading/auth*ing the user.
  useEffect(() => {
    if (!loading && false) {
      //Getting tickets that are open and not created by the user and has a limit of 10 documents
      QueryOpenTickets(10, user.uid)
        .then((docs) => setTickets(docs))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loading]);

  let openTickets: any = [];
  tickets?.forEach((ticket: any) => {
    openTickets.push(
      <Box key={ticket.id}>{JSON.stringify(ticket.data())}</Box>
    );
  });

  return (
    <Box width="100%" p="3em" mt={5}>
      <SimpleGrid
        name="charts area"
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing={5}
        p={2}
      >
        <Box>
          <LineChart />
        </Box>
        <Box>
          <LineChart />
        </Box>
        <Box>
          <LineChart />
        </Box>
      </SimpleGrid>

      <SimpleGrid
        gap={2}
        spacing={5}
        px={10}
        py={5}
        mt={10}
        borderRadius="10px"
      >
        <Heading>Open Tickets</Heading>

        <TicketModal onClose={onClose} isOpen={isOpen} />
        <TicketBox onOpen={onOpen} />

        <TicketModal onClose={onClose} isOpen={isOpen} />
        <TicketBox onOpen={onOpen} />

        <TicketModal onClose={onClose} isOpen={isOpen} />
        <TicketBox onOpen={onOpen} />

        <TicketModal onClose={onClose} isOpen={isOpen} />
        <TicketBox onOpen={onOpen} />

        <TicketModal onClose={onClose} isOpen={isOpen} />
        <TicketBox onOpen={onOpen} />

        <TicketModal onClose={onClose} isOpen={isOpen} />
        <TicketBox onOpen={onOpen} />

        <TicketModal onClose={onClose} isOpen={isOpen} />
        <TicketBox onOpen={onOpen} />
      </SimpleGrid>
    </Box>
  );
};

export default WithAuth(Dashboard);
