import React from "react";

function Chapter({ oneChapter }) {
    return (
        <div class={'flex w-full'}>
            <img class='w-16' src={oneChapter?.url} />
            <div>{oneChapter?.title}</div>
            {console.log(oneChapter)}
        </div>
    );
}

export default Chapter;
