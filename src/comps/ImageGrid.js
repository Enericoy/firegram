import React from 'react';
import useFirestore from '../hooks/useFirestore';
//creates the grid of images using the hook useFirestore

const ImageGrid = () => {
    const {docs} = useFirestore('images');
    console.log(docs);
    console.log('got here');
    return (
    <div className='img-grid'>
        images
    </div>
    )
}
export default ImageGrid