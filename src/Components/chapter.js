import React from "react";

function Chapter({ oneChapter }) {
    return (
        <div className={oneChapter?.valid ? 'flex w-full' : 'flex w-full  bg-gray-500 opacity-70'}>
            <img className='w-16' src={oneChapter?.url} />
            <div>{oneChapter?.title}</div>
            {console.log(oneChapter)}
        </div>
    );
}

export default Chapter;
