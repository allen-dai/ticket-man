import { db } from "../lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

const QueryOpenTickets = async (LIMIT: number, uid: string) => {
  const q = query(
    collection(db, "tickets"),
    where("status", "==", "open"),
    where("createdBy", "!=", uid),
    limit(LIMIT < 100 ? LIMIT : 20)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

const QueryUserTickets = async (LIMIT: number, user: string) => {
  const q = query(
    collection(db, "tickets"),
    where("createdBy", "==", user),
    limit(LIMIT < 100 ? LIMIT : 20)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

export { QueryOpenTickets, QueryUserTickets };
