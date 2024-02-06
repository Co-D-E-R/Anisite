import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useState, useEffect, useRef } from "react";
import { Combobox, Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";


function SearchApp() {
    const { isopen, setisopen } = useContext(DataContext);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const searchRef = useRef(null);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL}/meta/anilist/advanced-search`, { params: { query: query, sort: ["POPULARITY_DESC", "SCORE_DESC"] } });
            setResult(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    useEffect(() => {
        getData();
    }, [query])

    function closeModal() {
        setisopen(false);
    }

    return <>
        <div className="w-full h-full fixed top-0 left-0 z-50 bg-black bg-opacity-50">
            <Transition appear show={isopen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 py-14 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl bg-gray-950 transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-white"
                                    >
                                        Search Bar
                                    </Dialog.Title>
                                    <Combobox as="div" onChange={(e) => {
                                        setResult(null);
                                    }}>
                                        <div className="flex justify-between">
                                            <div className="flex-grow pr-1 ">
                                                <Combobox.Input
                                                    ref={searchRef}
                                                    className="mt-1 block w-full h-8  bg-gray-800 border border-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm rounded-md"
                                                    placeholder="Search Anime"
                                                    value={query}
                                                    onChange={(e) => {
                                                        setQuery(e.target.value);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" && result?.results?.length > 0) {
                                                            setisopen(false);
                                                            setResult(null);
                                                            setQuery("");
                                                            navigate(`/anime/search/${e.target.value}`)
                                                        }
                                                    }}
                                                    autoComplete="off"
                                                />


                                                <Combobox.Options static onClick={()=> setisopen(false)} className="border-spacing-y-1   h-64 rounded-md overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-900">
                                                    {!Loading ? (
                                                        <Fragment>
                                                            {result?.results?.length > 0
                                                                ? result?.results?.map((i) => (
                                                                    <Combobox.Option
                                                                        key={i.id}
                                                                        value={i.id}
                                                                        className={({ active }) => `${active ? " px-1  text-white hover:bg-blue-900" : ""}}`}
                                                                        onClick={() =>
                                                                                navigate(`/anime/info/${i.id}/${i.title.romaji || i.title.engilsh}`)
                                                                        }
                                                                    >
                                                                        <div className="flex flex-row hover:border hover:border-gray-500 hover:rounded-md h-16 mt-2">
                                                                            <div>
                                                                                <img src={i.image} alt={i.title.english || i.title.romaji} className="w-19 h-16" />
                                                                            </div>
                                                                            <div className="pl-3 mt-1 mb-1 h-6 cursor-pointer hover:h-9 hover:bg-black hover:rounded-md">
                                                                                <p>
                                                                                    {i.title.english || i.title.romaji}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </Combobox.Option>
                                                                )) :
                                                                (query !== '' &&
                                                                    <p className="flex items-center justify-center px-4 py-0 gap-1" >
                                                                        No results found.
                                                                    </p>
                                                                )}

                                                        </Fragment>
                                                    ) : (
                                                        query !== "" &&
                                                        <div>
                                                            Anime Loading....
                                                        </div>

                                                    )}
                                                </Combobox.Options>
                                            </div>
                                            <div className="">
                                                <button
                                                    type="button"
                                                    className="flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-blue-100 hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={() => {
                                                        navigate(`/anime/search/${query}`)
                                                        setisopen(false);
                                                        setQuery("");
                                                    }}
                                                >
                                                    Search
                                                </button>
                                            </div>


                                        </div>

                                    </Combobox>




                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    </>


}

export default SearchApp;