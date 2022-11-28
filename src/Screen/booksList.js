import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "../Components/book";
import Header from "../Components/header";



function ListBooks() {
    const [arrayBook, setArrayBook] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [nbBook, setNbBook] = useState(0);
    const [search, setSearch] = useState(null);
    const [subjects, setSubjects] = useState(null);
    const [Lvl, setLvl] = useState(null);
    const [selectsubjects, setSelectSubjects] = useState("");
    const [selectLvl, setSelectLvl] = useState("");


    useEffect(() => {
        fetch_book()
    }, [])

    useEffect(() => {
        if (arrayBook.length)
            setIsLoading(true)
    }, [arrayBook])


    async function fetch_book() {
        setIsLoading(false)
        let tmpSubject = [];
        let tmpLvl = [];
        let response = await axios.post(`https://api.lelivrescolaire.fr/graphql`, {
            query: "query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}",
        });
        response = response?.data?.data?.viewer?.books?.hits
        setArrayBook(response)
        setNbBook(response?.length)
        response.map(it => tmpSubject.push(it.subjects[0]?.name))
        response.map(it => tmpLvl.push(it.levels[0]?.name))
        var uniqueSubject = tmpSubject.filter((x, i) => tmpSubject.indexOf(x) === i);
        var uniqueLvl = tmpLvl.filter((x, i) => tmpLvl.indexOf(x) === i);
        setSubjects(uniqueSubject)
        setLvl(uniqueLvl)
    }

    function showBook10() {
        let tmp = []
        for (let index = 0; index < 10; index++) {
            tmp.push(arrayBook[index])
        }
        return tmp
    }


    function searchBook(books) {
        let tmp = [...books];
        if (selectsubjects !== "" && selectLvl !== "") {
            console.log('les 2')
            tmp = books.filter(it => it.subjects[0]?.name.includes(selectsubjects) && it.levels[0]?.name.includes(selectLvl))
            if (search) {
                return tmp.filter(it => it.displayTitle?.toLowerCase()?.includes(search.toLowerCase()))
            }
            else return tmp
        }
        else if (selectsubjects !== "") {
            console.log('suj')

            tmp = books.filter(it => it.subjects[0]?.name.includes(selectsubjects))
            if (search) {
                return tmp.filter(it => it.displayTitle?.toLowerCase()?.includes(search.toLowerCase()))
            }
            else return tmp
        }
        else if (selectLvl !== "") {
            console.log('lvl')

            tmp = books.filter(it => it.levels[0]?.name.includes(selectLvl));
            if (search) {
                return tmp.filter(it => it.displayTitle?.toLowerCase()?.includes(search.toLowerCase()))
            }
            else return tmp
        } else {
            return books.filter((it) =>
                it.displayTitle?.toLowerCase()?.includes(search.toLowerCase())
            );
        }
    };

    return (
        <div>
            <Header name={'Les livres'} search={search} setSearch={setSearch} />
            <div class='flex'>
                <select
                    onChange={(e) => setSelectLvl(e.target.value)}
                    className="w-1/2 p-4 m-4 shadow-md bg-white outline-none border border-gray-400 focus:border-gray-300 focus:border"
                >
                    <option value="">Niveau</option>
                    {Lvl?.map((it) => (
                        <option value={it}>
                            {it}
                        </option>
                    ))}
                </select>
                <select
                    onChange={(e) => setSelectSubjects(e.target.value)}
                    className="w-1/2 p-4  m-4  shadow-md bg-white outline-none border border-gray-400 focus:border-gray-300 focus:border"
                >
                    <option value="">Matière</option>
                    {subjects?.map((it) => (
                        <option value={it}>
                            {it}
                        </option>
                    ))}
                </select>
            </div>
            <div class='h-fit' >
                {isLoading ?
                    search || selectsubjects || selectLvl ?
                        <div class='flex flex-wrap'>
                            {searchBook(arrayBook).map((items, index) =>
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
