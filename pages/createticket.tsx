import withAuth from "../components/withAuth";
import {
  Heading,
  Container,
  Button,
  Input,
  FormControl,
  Textarea,
  SimpleGrid,
  Radio,
  HStack,
  RadioGroup,
  FormHelperText,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { CreateTicket } from "../query/ticket";
import { useState } from "react";
import { useUserContext } from "../lib/firebaseHook";
import {useRouter} from "next/router";

const Createticket= () => {
  // iss: string;
  // iat: string;
  // description: string;
  // priority: string;
  // typ: string;
  // takenBy?: string;
  // status: string;
  // record_num: string;
  // title: string;
  const {user} = useUserContext();
  const [descriptoin, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>();
  const router = useRouter();
  const onSubmit = (e: any) => {
    e.preventDefault();
    //@ts-ignore
    CreateTicket({ description: descriptoin, title: title, priority: priority, createdBy:user.displayName, iss:user.uid})
    .then( ()=>{
      router.push("/tickets");
    });
  }

  return (
    <Container maxW="container.md" mt={20}>
      <Heading>Create Ticket</Heading>
      <form onSubmit={e => onSubmit(e)}>
        <SimpleGrid gap={4} mt={4}>
          <FormControl>
            <FormHelperText> Select priority</FormHelperText>
            <RadioGroup onChange={value => setPriority(value)} >
              <HStack spacing="24px">
                <Radio value="low">Low</Radio>
                <Radio value="medium">Medium</Radio>
                <Radio value="high">High</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Input placeholder="title" name="title" onChange={(e) => setTitle(e.currentTarget.value)} />
          <Textarea height="200px" placeholder="Description" isRequired resize="none" onChange={(e) => setDescription(e.currentTarget.value)} />
          <Button type="submit" colorScheme="green" rightIcon={<AddIcon />}>Create</Button>
        </SimpleGrid>
      </form>
    </Container>
  )
};

export default withAuth(Createticket);
