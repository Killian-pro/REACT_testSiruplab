import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "../Components/book";
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
    const [arrayBook, setArrayBook] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [nbBook, setNbBook] = useState(0);
    const [search, setSearch] = useState(null);


    useEffect(() => {
        fetch_book()
    }, [])

    useEffect(() => {
        if (arrayBook.length)
            setIsLoading(true)
    }, [arrayBook])


    async function fetch_book() {
        setIsLoading(false)
        const response = await axios.post(`https://api.lelivrescolaire.fr/graphql`, {
            query: "query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}",
        });
        setArrayBook(response?.data?.data?.viewer?.books?.hits)
        setNbBook(response?.data?.data?.viewer?.books?.hits?.length)
    }

    function showBook10() {
        let tmp = []
        for (let index = 0; index < 10; index++) {
            tmp.push(arrayBook[index])
        }
        return tmp
    }


    return (
        <div>
            <Header name={'Les livres'} search={search} setSearch={setSearch} />
            <div class='h-fit' >
                {isLoading ?
                    search ?
                        <div class='flex flex-wrap'>
                            {searchWord(search, arrayBook).map((items, index) =>
                                <Book oneBook={items} />
                            )}
                        </div>
                        :
                        <div class='flex flex-wrap'>
                            {arrayBook.map(it =>
                                <Book oneBook={it} />
                            )}
                        </div>
                    : <></>}
            </div>
            {/* <div class='flex w-full h-16 items-center bg-gray-200 justify-center'>
                {nbBook / 10}
            </div> */}
        </div >
    );
}

export default ListBooks;
