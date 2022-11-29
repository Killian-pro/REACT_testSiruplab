import React from "react";
import { useNavigate } from "react-router-dom";
import noImage from '../Img/noImage.png'

function Book({ oneBook }) {
    const navigate = useNavigate();

    const goBookById = (id, name) => {
        navigate('/ChapterList', { state: { id: id, name: name } })
    };

    return (
        <div className={oneBook?.valid ? 'flex p-4 items-center w-1/2  hover:bg-sky-200 ' : 'flex p-4 items-center w-1/2 bg-gray-500 opacity-70'} onClick={() => { if (oneBook?.valid) goBookById(oneBook?.id, oneBook?.displayTitle) }}>
            <img className='w-16' src={oneBook?.url ? oneBook?.url : noImage} />
            <div className='flex flex-col flex-1'>
                <div className='ml-2'>{oneBook?.displayTitle}</div>
                <div className='ml-2 font-semibold'>{oneBook?.levels[0]?.name}</div>
            </div>
            {oneBook?.valid && <div className=' ml-12 ' >►</div>}
        </div >

    );
}

export default Book;
