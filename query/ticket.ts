import { db } from "../lib/firebase";
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    limit,
    doc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";

type ticketProps = {
    createdBy: string;
    iss: string;
    iat: any; //"FieldValue"
    description: string;
    priority: string;
    typ: string;
    takenBy?: string;
    status: string;
    record_num: string;
    title: string;
};

type ticketParams = {
    createdBy: string;
    iss: string;
    title: string;
    description: string;
    priority: string;
};

const QueryOpenTickets = async (LIMIT: number, uid: string) => {
    const q = query(
        collection(db, "ticket"),
        where("status", "==", "open"),
        where("iss", "!=", uid),
        limit(LIMIT < 100 ? LIMIT : 20)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
};

const QueryUserTickets = async (LIMIT: number, uid: string) => {
    const q = query(
        collection(db, "ticket"),
        where("iss", "==", uid),
        where("status", "==", "open"),
        limit(LIMIT < 100 ? LIMIT : 20)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
};

const QueryInProgressTicket = async (LIMIT: number, uid: string) => {
    const q = query(
        collection(db, "ticket"),
        where("takenBy", "==", uid),
        where("status", "==", "In Progress"),
        limit(LIMIT < 100 ? LIMIT : 20)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
};

const CreateTicket = async (info: ticketParams) => {
    const ticket: ticketProps = {
        ...info,
        iat: serverTimestamp(),
        typ: "ticket",
        status: "open",
        takenBy: "",
        record_num: "",
    };
    await addDoc(collection(db, "ticket"), ticket);
};

export { QueryOpenTickets, QueryUserTickets, QueryInProgressTicket, CreateTicket };
