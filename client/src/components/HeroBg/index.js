import React, { useEffect, useState } from 'react';
import thisSign from '../../imgs/thisasign.jpeg';
import flippingBook from '../../imgs/flippingbook.jpeg';
import penAndPaper from '../../imgs/penandpaper.jpeg';
import writeFrankly from '../../imgs/writefrankly.jpeg';
import writingDesk from '../../imgs/writingdesk.jpeg';
import yourStory from '../../imgs/yourstory.jpeg';

const HeroBg = () => {
    const [count, setCount] = useState(0);

    const pictures = [
        thisSign,
        flippingBook,
        penAndPaper,
        writeFrankly,
        writingDesk,
        yourStory
    ];

    useEffect(() => {
        const randomSelection = () => {
            let num = Math.round(Math.random() * 10 / 2);
            if (num > 5) {
                return randomSelection();
            }
            return num;
        };
        setCount((count) => count = randomSelection());
      }, []);
    
    return(
        <img src={pictures[count]} alt="login hero background" className='w-100 shadow-lg rounded'/>
    );
};

export default HeroBg;