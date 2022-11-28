import React from "react";
import { useNavigate } from "react-router-dom";
import noImage from '../Img/noImage.png'

function Book({ oneBook }) {
    const navigate = useNavigate();

    const goBookById = (id) => {
        navigate('/ChapterList', { state: { id: id } })
    };

    return (
        <div class={oneBook?.valid ? 'flex p-4 items-center w-1/2  hover:bg-sky-200 ' : 'flex p-4 items-center w-1/2 bg-gray-500 opacity-70'} onClick={() => { if (oneBook?.valid) goBookById(oneBook?.id) }}>
            <img class='w-16' src={oneBook?.url ? oneBook?.url : noImage} />
            <div class='flex flex-col flex-1'>
                <div class='ml-2'>{oneBook?.displayTitle}</div>
                <div class='ml-2 font-semibold'>{oneBook?.levels[0]?.name}</div>
            </div>
            {oneBook?.valid && <div class=' ml-12 ' >►</div>}
        </div >

    );
}

export default Book;
