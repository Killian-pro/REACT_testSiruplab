import React from "react";
import logo from '../Img/logo.svg'

function Header({ name, setSearch }) {
    return (
        <div className={'flex w-full items-center bg-gray-200 h-20'}>
            <a href="/" className='ml-4 w-1/6'><img src={logo} /></a>
            <div className='flex-1 text-center font-bold truncate mx-4'>{name}</div>
            <form className="flex items-center mr-8">
                <label for="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input onChange={e => setSearch(e.target.value)} type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title,Matter,Word,..." required />
                </div>
            </form>
        </div>
    );
}

export default Header;
