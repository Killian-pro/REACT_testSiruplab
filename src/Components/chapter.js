import React from "react";

function Chapter({ oneChapter }) {
    return (
        <div>
            <div>{oneChapter?.title}</div>
            <img class='w-16' src={oneChapter?.url} />
            <div> {oneChapter?.valid}</div>
        </div>
    );
}

export default Chapter;
