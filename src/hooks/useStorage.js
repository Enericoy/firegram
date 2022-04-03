import { async } from '@firebase/util';
import {useState, useEffect} from 'react';
import {projectStorage, projectFirestore} from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore"; 
import { updateDoc, serverTimestamp } from "firebase/firestore";

const useStorage = (file) => {
    // progress of the upload
    const[progress,setProgress]= useState(0);
    // any errors from the upload
    const[error,setError]= useState(null);
    //url we get back from the storage after upload
    const[url,setUrl]= useState(null);

    // useEffect(()=> {
    //     //references 
    //     const storageRef = projectStorage.ref(file.name);
        
    //     //take file & put it in the reference, using the PUT method, with attacted listener (snap function) when state changes
    //     storageRef.put(file).on('state_changed', (snap) => {
    //         let percentage = (snap.bytesTransferred/snap.totalBytes)*100;
    //         setProgress(percentage);
    //     }, (err) => {
    //         setError(err);
    //     }, async () => {
    //         const url = await storageRef.getDownloadURL();
    //         setUrl(url)
    //     });

    // }, [file]);  

    useEffect(() => {
        // create reference
        //console.log('the name of the file is' + file.name);
        //console.log(file.name);
        const storageRef = ref(projectStorage, file.name);
        const storageRefNew = ref(projectStorage, file.name);

        const uploadTask = uploadBytesResumable(storageRefNew,file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log('Upload is ' + progress + '% done');
            setProgress(progress);
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (err) => {
            // Handle unsuccessful uploads
            setError(err);
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //console.log('File available at', downloadURL);
            const createdAt=serverTimestamp();
            try {
                const docRef = addDoc(collection(projectFirestore, "images"), {
                  url: downloadURL,
                  createdAt: createdAt,
                });
                //console.log("Document written to database");
              } catch (e) {
                //console.error("Error adding document: ", e);
              }
            setUrl(downloadURL);
            });
        }
        );



        // console.log(projectStorage);
        // console.log(file.name)
        // const storageRef = ref(projectStorage, file.name);
        // console.log(storageRef);

        // const uploadTask = uploadBytesResumable(storageRef, file);
        
        // //take file & put it in the reference, using the PUT method, with attacted listener (snap function) when state changes
        // uploadTask.on(
        //     'state_changed',
        //     (snapshot) => {
        //         let percentage =
        //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         setProgress(percentage);
        //     },
        //     (err) => {
        //         setError(err);
        //     },
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then((url) =>
        //             setUrl(url)
        //         );
        //     }
        // );
    }, [file]); //file here is a dependency which, useEffect will fire everytime file changes

    return { progress, url, error}
  }

  export default useStorage;