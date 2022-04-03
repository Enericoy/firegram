import { DocumentSnapshot, orderBy } from 'firebase/firestore';
import {useState, useEffect} from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, query, where, onSnapshot } from "firebase/firestore";

const useFirestore = (collections) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const q = query(collection(projectFirestore, collections));
        const unsub = onSnapshot(q, (snap) => {
            let documents = [];
            snap.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
                //documents.push(doc.data().createdAt);
                
            });
            //console.log("Current document name is: ", documents.join(", "));
            setDocs(documents);
        });

        return () => unsub();

    }, [collections]) //fires everytime the collection changes

    return {docs};
} 

export default useFirestore;
