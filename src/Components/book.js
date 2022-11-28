import React from "react";

function Book({ oneBook }) {
    return (
        <div>
            <div>{oneBook?.displayTitle}</div>
            <div>{oneBook?.levels[0]?.name}</div>
            <div>{oneBook?.valid}</div>
            <img class='w-16' src={oneBook?.url} />
        </div>

    );
}

export default Book;
