import React from 'react';
import { FaDownload } from 'react-icons/fa'; 

const Statute: React.FC = () => {
    return (
        <div className='my-[5vh]'>
        <div className=" flex justify-center slide-in">
            <div className="h-[80vh] bg-white p-8 rounded-lg shadow-lg lg:w-11/12 sm:w-full text-center">
                <h1 className="mt-[20vh] text-3xl font-semibold text-gray-800 mb-4">Statut organizacji</h1>
                <p className="text-gray-600 mb-6">
                    Aby pobrać pełny dokument statutu, kliknij przycisk poniżej.
                </p>
                <a 
                    href="/documents/statut.pdf" 
                    download 
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                    <FaDownload className="mr-2" /> Pobierz Statut
                </a>
            </div>
        </div>
        </div>
    );
};

export default Statute;