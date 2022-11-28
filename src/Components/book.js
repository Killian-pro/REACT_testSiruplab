import React from "react";
import { useNavigate } from "react-router-dom";
import noImage from '../Img/noImage.png'

function Book({ oneBook }) {
    const navigate = useNavigate();

    const goBookById = (id, name) => {
        navigate('/ChapterList', { state: { id: id, name: name } })
    };

    return (
        <div class={oneBook?.valid ? 'flex p-4 items-center w-1/2' : 'flex p-4 items-center w-1/2 bg-gray-600'} onClick={() => { if (oneBook?.valid) goBookById(oneBook?.id, oneBook?.displayTitle) }}>
            <img class='w-16' src={oneBook?.url} />
            <div>
                <div class='ml-2'>{oneBook?.displayTitle}</div>
                <div class='ml-2'>{oneBook?.levels[0]?.name}</div>
            </div>
        </div >

    );
}

export default Book;
