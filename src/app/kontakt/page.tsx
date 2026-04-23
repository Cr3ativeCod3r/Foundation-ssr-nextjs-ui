'use client';

import React, { useState } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  name: string;
  surname: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: '', surname: '', email: '', message: '' };

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/api/mailer/send-email`,
        formData,
        { headers: { 'Content-Type': 'application/json' } },
      );

      if (response.data.success) {
        toast.success('Wiadomość wysłana!', { position: 'top-right' });
        setFormData(INITIAL_FORM);
      } else {
        toast.error('Błąd wysyłania wiadomości.', { position: 'top-right' });
      }
    } catch (error) {
      console.error('[Contact] Send failed:', error);
      toast.error('Wystąpił problem z serwerem.', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `
    w-full pl-11 pr-4 py-3 rounded-xl
    border-2 border-slate-200 bg-white text-slate-800
    focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
    transition-all duration-200
    text-sm placeholder:text-slate-400
  `;

  return (
    <div className="min-h-[80vh] py-10 animate-fade-in">
      <ToastContainer />

      <div className="max-w-xl mx-auto px-4">
        <div className="card-elevated p-6 md:p-8">
          {/* Header */}
          <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">
            Skontaktuj się z nami
          </h1>
          <p className="text-sm text-slate-500 text-center mb-2">
            Wypełnij formularz, a my odpowiemy najszybciej jak to możliwe
          </p>
          <p className="text-sm text-slate-500 text-center mb-6">
            Lub napisz do nas na:{' '}
            <a
              href="mailto:fundacjachorobmozgu@gmail.com"
              className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
            >
              fundacjachorobmozgu@gmail.com
            </a>
          </p>

          {/* Banner image */}
          <div className="relative w-full h-32 rounded-xl overflow-hidden mb-8 opacity-70">
            <Image
              src="/img/banner_arms.jpg"
              alt="Kontakt"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-transparent" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="name"
                placeholder="Imię"
                className={inputClasses}
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={20}
              />
            </div>

            {/* Surname */}
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="surname"
                placeholder="Nazwisko"
                className={inputClasses}
                value={formData.surname}
                onChange={handleChange}
                required
                maxLength={20}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="Adres e-mail"
                className={inputClasses}
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={50}
              />
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare size={16} className="absolute left-4 top-4 text-slate-400" />
              <textarea
                name="message"
                placeholder="Treść wiadomości"
                className={`${inputClasses} h-36 resize-none pt-3`}
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={1000}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-xl
                bg-gradient-to-r from-teal-600 to-teal-500
                text-white font-semibold text-sm
                hover:from-teal-700 hover:to-teal-600
                disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed
                transition-all duration-200
                shadow-md hover:shadow-lg
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Wyślij wiadomość
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;