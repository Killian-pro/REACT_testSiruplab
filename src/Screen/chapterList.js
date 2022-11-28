import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Chapter from "../Components/chapter";



function ListBooks() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [arrayChapter, setArrayChapter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        if (state?.id) {
            fetch_chapter()
        }
        else {
            navigate('/')
        }
    }, [state])

    useEffect(() => {
        if (arrayChapter?.length)
            setIsLoading(true)
    }, [arrayChapter])


    async function fetch_chapter() {
        const response = await axios.post(`https://api.lelivrescolaire.fr/graphql`, {
            query: "query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}",
            variables: {
                bookId: state?.id,
            },
        });
        setArrayChapter(response?.data?.data?.viewer?.chapters?.hits)
    }


    return (
        <div class='flex  flex-wrap'>
            {isLoading ? arrayChapter?.map(it =>
                <div class='w-1/3 h-40'>
                    <Chapter oneChapter={it} />
                </div>
            ) : <></>}
        </div>
    );
}

export default ListBooks;
