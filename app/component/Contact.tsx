//PMQ 3150
import SectionHeader from '../common/SectionHeader';

const fieldClass =
    'w-full px-4 bg-nb-card text-nb-ink placeholder:text-nb-muted border-[3px] border-nb-ink shadow-hard-4 outline-none transition-[translate,box-shadow] duration-100 focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_#007bff]';

const labelClass = 'font-pixel text-[10px] mb-2.5 block';

const Contact = () => {
    return (
        <section id="contact" className="max-w-[1200px] mx-auto px-6 py-[72px]">
            <SectionHeader stage="STAGE 1-6" title="CONTACT" meta="SEND A MESSAGE" />

            <form
                action="https://formspree.io/f/xgvvypqo"
                method="POST"
                className="max-w-[640px] mx-auto bg-nb-card border-[3px] border-nb-ink shadow-hard-8"
            >
                <div className="bg-nb-panel text-white px-[18px] py-3 flex justify-between gap-3">
                    <span className="font-pixel text-[10px] text-nb-yellow">NEW MESSAGE</span>
                    <span className="flex gap-1.5 items-center">
                        <span className="w-2.5 h-2.5 bg-nb-pink" />
                        <span className="w-2.5 h-2.5 bg-nb-yellow" />
                        <span className="w-2.5 h-2.5 bg-nb-green" />
                    </span>
                </div>

                <div className="p-[22px] flex flex-col gap-6">
                    <div>
                        <label htmlFor="name" className={labelClass}>NAME</label>
                        <input type="text" name="name" id="name" placeholder="Player 2" required className={`${fieldClass} h-[50px]`} />
                    </div>

                    <div>
                        <label htmlFor="email" className={labelClass}>EMAIL</label>
                        <input type="email" name="email" id="email" placeholder="you@example.com" required className={`${fieldClass} h-[50px]`} />
                    </div>

                    <div>
                        <label htmlFor="message" className={labelClass}>MESSAGE</label>
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Say hi..."
                            required
                            className={`${fieldClass} h-[200px] py-3 resize-none`}
                        />
                    </div>

                    <button
                        type="submit"
                        className="self-center font-pixel text-xs bg-nb-blue text-white px-[22px] py-[18px] border-[3px] border-nb-ink shadow-hard-4 flex gap-3 items-center transition-[translate,rotate,scale,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-6 active:translate-x-1 active:translate-y-1 active:shadow-hard-0"
                    >
                        <span>▶</span>
                        <span>SEND</span>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Contact;
