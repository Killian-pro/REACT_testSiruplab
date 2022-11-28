import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "../Components/book";

function ListBooks() {
    const [arrayBook, setArrayBook] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


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
    }


    return (
        <div >
            {isLoading ? arrayBook?.map(it =>
                <div>
                    <Book oneBook={it} />
                </div>
            ) : <></>}
        </div>
    );
}

export default ListBooks;
