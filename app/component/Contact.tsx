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

    // Determine border color based on theme
    const borderColorClass = theme === 'dark' ? 'border-white' : 'border-gray-400';

    return (
        <section
            id="contact"
            className="min-h-[650px] md:min-h-[750px] flex flex-col items-center py-16 px-6 md:py-24 md:px-16"
        >
            <h1 className="text-4xl md:text-5xl font-rubik font-black tracking-normal mb-8 md:mb-12">
                CONTACT
            </h1>

            <form
                action="https://formspree.io/f/xgvvypqo"
                method="POST"
                className="flex flex-col gap-6 md:gap-8 w-full max-w-md md:max-w-lg lg:max-w-xl font-mono"
            >
                <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        required
                        className={`h-[50px] px-4 w-full rounded-[20px] border ${borderColorClass} 
                                bg-[var(--background-color)] text-[var(--text-color)]
                                focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-transparent
                                transition-all duration-300`}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                        className={`h-[50px] px-4 w-full rounded-[20px] border ${borderColorClass} 
                                bg-[var(--background-color)] text-[var(--text-color)]
                                focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-transparent
                                transition-all duration-300`}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        placeholder="Message"
                        required
                        className={`h-[250px] p-4 w-full rounded-[20px] border ${borderColorClass} 
                                bg-[var(--background-color)] text-[var(--text-color)] resize-none
                                focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-transparent
                                transition-all duration-300`}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-[var(--bt-color)] text-[var(--btn-text-color)] 
                                rounded-[20px] w-[126px] h-[50px] text-base md:text-lg 
                                font-bold font-rubik shadow-[0_4px_4px_rgba(0,0,0,0.25)] 
                                hover:scale-105 active:translate-y-0.5 active:shadow-[0_2px_2px_rgba(0,0,0,0.25)]
                                transition-all duration-200 mx-auto"
                >
                    Submit
                </button>
            </form>
        </section>
    );
};

export default Contact;
