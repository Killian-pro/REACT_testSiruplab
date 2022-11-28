import React from "react";
import { useNavigate } from "react-router-dom";


function Book({ oneBook }) {
    const navigate = useNavigate();

    const goBookById = (id) => {
        navigate('/ChapterList', { state: { id: id } })
    };

    return (
        <div onClick={() => { goBookById(oneBook?.id) }}>
            <div>{oneBook?.displayTitle}</div>
            <div>{oneBook?.id}</div>
            <div>{oneBook?.levels[0]?.name}</div>
            <div>{oneBook?.valid}</div>
            <img class='w-16' src={oneBook?.url} />
        </div >

    );
}

export default Book;
