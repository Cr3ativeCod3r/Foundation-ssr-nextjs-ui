"use client";
import React, { useState } from 'react';
import { FiMail, FiUser, FiMessageSquare } from 'react-icons/fi';
import axios from 'axios';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', surname: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/api/mailer/send-email`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.success) {
                toast.success('Wiadomość wysłana!', { position: "top-right" });
                setFormData({ name: '', surname: '', email: '', message: '' });
            } else {
                toast.error('Błąd wysyłania wiadomości.', { position: "top-right" });
            }
        } catch (error) {
            console.error('Błąd wysyłania e-maila:', error);
            toast.error('Wystąpił problem z serwerem.', { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='my-[5vh]'>
            <div className="lg:w-[50vw] slide-in mx-auto sm:w-full  flex justify-center">
                <div className="bg-white lg:py-8 lg:px-8 sm: px-2 sm: py-8 rounded-lg lg:shadow-lg sm: shadow-sm w-full">
                    <ToastContainer />

                    <h2 className="text-2xl font-semibold justify-center text-gray-800 mb-6 flex items-center text-center">
                        Wypełnij formularz kontaktowy
                    </h2>
                    <Image src="/img/banner_arms.jpg" alt="Decorative banner with arms" className='mb-8 opacity-50' width={1000} height={300}/>


                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                            <FiUser className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Imię"
                                className="w-full outline-none bg-white text-black"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                maxLength={20}
                            />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                            <FiUser className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                name="surname"
                                placeholder="Nazwisko"
                                className="w-full outline-none bg-white text-black"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                                maxLength={20}
                            />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                            <FiMail className="text-gray-500 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full outline-none bg-white text-black"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                maxLength={50}
                            />
                        </div>
                        <div className="flex items-start border border-gray-300 rounded-lg px-3 py-2">
                            <FiMessageSquare className="text-gray-500 mr-2 mt-1" />
                            <textarea
                                name="message"
                                placeholder="Treść wiadomości"
                                className="w-full outline-none resize-none h-36 bg-white text-black"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                maxLength={1000}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex justify-center cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? 'Wysyłanie...' : 'Wyślij'}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Contact;