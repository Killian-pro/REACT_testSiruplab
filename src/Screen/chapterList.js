import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Chapter from "../Components/chapter";
import Header from "../Components/header";



function searchWord(nameKey, myArray) {
    let tmp = [];
    myArray.map(it => {
        if (it?.displayTitle?.toLowerCase().includes(nameKey?.toLowerCase())) {
            tmp.push(it);
        }
    })
    return tmp;
}


function ListBooks() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [arrayChapter, setArrayChapter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState(null);



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
        let response = await axios.post(`https://api.lelivrescolaire.fr/graphql`, {
            query: "query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}",
            variables: {
                bookId: state?.id,
            },
        });
        response = response?.data?.data?.viewer?.chapters?.hits.sort((a, b) => a.id - b.id);
        console.log(response)
        setArrayChapter(response)
    }


    return (
        <div>
            <Header name={'Les chapitres de ' + state?.name} search={search} setSearch={setSearch} />
            <div class='flex  flex-wrap'>
                {isLoading ? arrayChapter?.map((it, index) =>
                    <div key={index} class='w-1/3 h-20'>
                        <Chapter oneChapter={it} index={index} />
                    </div>
                ) : <></>}
            </div>
        </div>
    );
}

export default ListBooks;
