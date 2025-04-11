"use client";

import { useState } from "react";
import { useTheme } from "../common/ThemeContext";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const { theme } = useTheme();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
        // Reset form
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section
            id="contact"
            className="min-h-[100dvh] flex flex-col items-center py-6 px-6 md:py-16 md:px-16"
        >
            <h1 className="text-4xl md:text-5xl font-rubik font-black tracking-normal mb-8 md:mb-12">
                CONTACT
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 md:gap-8 w-full max-w-md md:max-w-lg lg:max-w-xl font-mono"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-[50px] px-4 rounded-[20px] border border-gray-400 dark:border-gray-600 
                             bg-[var(--background-color)] text-[var(--text-color)]
                             focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-transparent
                             transition-all duration-300"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-[50px] px-4 rounded-[20px] border border-gray-400 dark:border-gray-600 
                                bg-[var(--background-color)] text-[var(--text-color)]
                                focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-transparent
                                transition-all duration-300"
                />

                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="h-[250px] p-4 rounded-[20px] border border-gray-400 dark:border-gray-600 
                                bg-[var(--background-color)] text-[var(--text-color)] resize-none
                                focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-transparent
                                transition-all duration-300"
                />

                <button
                    type="submit"
                    className="bg-[var(--bt-color)] text-[var(--btn-text-color)] 
                             rounded-[20px] w-[126px] h-[50px] text-lg md:text-xl 
                             font-bold font-rubik shadow-[0_4px_4px_rgba(0,0,0,0.25)] 
                             transition-all duration-200 hover:scale-105 
                             active:translate-y-0.5 active:shadow-[0_2px_2px_rgba(0,0,0,0.25)]
                             mx-auto"
                >
                    Submit
                </button>
            </form>
        </section>
    );
};

export default Contact;
