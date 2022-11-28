import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "../Components/book";
import Header from "../Components/header";



function ListBooks() {
    const [arrayBook, setArrayBook] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [nbBook, setNbBook] = useState(0);
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
        // setNbBook(response?.length)
        response.map(it => tmpSubject.push(it.subjects[0]?.name))
        response.map(it => tmpLvl.push(it.levels[0]?.name))
        var uniqueSubject = tmpSubject.filter((x, i) => tmpSubject.indexOf(x) === i);
        var uniqueLvl = tmpLvl.filter((x, i) => tmpLvl.indexOf(x) === i);
        setSubjects(uniqueSubject)
        setLvl(uniqueLvl)
    }

    // function showBook10() {
    //     let tmp = []
    //     for (let index = 0; index < 10; index++) {
    //         tmp.push(arrayBook[index])
    //     }
    //     return tmp
    // }


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
            <div className='flex'>
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
            <div className='h-fit' >
                {isLoading ?
                    search || selectsubjects || selectLvl ?
                        <div className='flex flex-wrap'>
                            {searchBook(arrayBook).map((items, index) =>
                                <Book oneBook={items} />
                            )}
                        </div>
                        :
                        <div className='flex flex-wrap'>
                            {arrayBook.map(it =>
                                <Book oneBook={it} />
                            )}
                        </div>
                    : <>
                        <div className="text-center">
                            <div role="status">
                                <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </>}
            </div>
            {/* <div className='flex w-full h-16 items-center bg-gray-200 justify-center'>
                {nbBook / 10}
            </div> */}
        </div >
    );
}

export default ListBooks;
