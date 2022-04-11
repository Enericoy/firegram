import React from 'react';
import useFirestore from '../hooks/useFirestore';
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion';

//creates the grid of images using the hook useFirestore

const ImageGrid = ({setSelectedImg}) => {
    const {docs} = useFirestore('images');
    //console.log(docs);
    //console.log('got here');
    return (
    <div className='img-grid'>
        {docs && docs.map(doc => (
            <motion.div className='img-wrap' key = {doc.id} onClick={() => setSelectedImg(doc.url)}
            layout
            whileHover={{opacity : 1}}>
                <motion.img src={doc.url} alt="uploaded pic"
                initial={{opacity : 0}}
                animate={{opacity : 1.0}}
                transition={{delay : 1 }} />
            </motion.div>
        ))}
    </div>
    )
}
export default ImageGrid