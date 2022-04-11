import React from 'react';
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion';


// upload a file, check the file is selected and 
const Modal = ({selectedImg, setSelectedImg}) => {
     
    // click event function to remove the picture - e is the event object
    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null); 
        }
    }

    return (
        <motion.div className='backdrop' onClick={handleClick}
        initial = {{opacity : 0}}
        animate = {{opacity : 1 }}>
            <motion.img src={selectedImg} alt="enlarged picture"
            initial ={{ y: '-100vh' }}
            animate ={{ y: 0 }}/>
        </motion.div>
    )
}

export default Modal;