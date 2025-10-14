import ProjectCard from '../common/ProjectCard';

// Use your existing projects from the public folder
export default function Projects() {
    return (
        <section id="projects" className="py-16 md:py-24 min-h-[650px] flex flex-col items-center p-6 md:p-8 lg:p-16">
            <div className="section-header">
                <h2 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">PROJECTS</h2>
            </div>


            <div className="flex flex-col items-center gap-4 pt-4 md:pt-5 lg:pt-8 md:flex-row md:flex-wrap md:justify-center md:gap-6 lg:gap-8">


                <ProjectCard
                    src="/projects/chesayang.webp"
                    link="https://resepi-chesayang.vercel.app/"
                    h3="Resepi Che Sayang Kitchen"
                    p="Data Scraping Project"
                />

                <ProjectCard
                    src="/projects/awards.webp"
                    link="https://bobo-game-awards.vercel.app/"
                    h3="Bobo Game Awards"
                    p="Game Awards Platform"
                />
                <ProjectCard
                    src="/projects/khairulaming.webp"
                    link="https://www.resepika.my/"
                    h3="Resepi Khairul Aming"
                    p="Data Scraping Project"
                />
                <ProjectCard
                    src="/projects/sgl.webp"
                    link="https://www.spudingamelist.my/"
                    h3="Spudin Game List"
                    p="Game Rating Platform"
                />
                <ProjectCard
                    src="/projects/ronaldo.webp"
                    link="https://ronaldo-bot.vercel.app/"
                    h3="CR7 Hydration Discord Bot"
                    p="“No Coke, Water!”"
                />
                <ProjectCard
                    src="/projects/ehs.webp"
                    link="https://github.com/danishayman/EHS_PORTAL"
                    h3="Environment, Health & Safety Portal"
                    p="ASP.NET Application"
                />
                <ProjectCard
                    src="/projects/homestay.webp"
                    link="https://tuahsuci.vercel.app/"
                    h3={
                        <>
                            Tuah Cemerlang
                            <br />
                            Homestay
                        </>
                    }
                    p="Next.js Application"
                />
                <ProjectCard
                    src="/projects/fets.webp"
                    link="https://github.com/danishayman/FireExtinguisherTrackingSystem"
                    h3="Fire Extinguisher Tracking System"
                    p="ASP.NET Application"
                />
                <ProjectCard
                    src="/projects/bird.webp"
                    link="https://github.com/danishayman/Flappy-Bird-AI"
                    h3="Flappy Bird AI"
                    p="Neural Network Model"
                />
                <ProjectCard
                    src="/projects/teapot.webp"
                    link="https://danishayman.github.io/3D-Objects-Playground/"
                    h3="3D Objects Playground"
                    p="WebGL Application"
                />
                <ProjectCard
                    src="/projects/speaker.webp"
                    link="https://github.com/danishayman/Speaker-Change-Detection/blob/main/Speaker-Change-Detection.ipynb"
                    h3="Speaker Change Detection"
                    p="Neural Network Model"
                />
                <ProjectCard
                    src="/projects/rainmeter.webp"
                    link=""
                    h3="Code Geass Rainmeter Skin"
                    p="My Rainmeter Setup"
                />
                <ProjectCard
                    src="/projects/law.webp"
                    link="https://github.com/danishayman/Law-Firm-Management"
                    h3="Law Firm Management"
                    p="JavaFx Application"
                />
                <ProjectCard
                    src="/projects/gasket.webp"
                    link="https://danishayman.github.io/3D-Sierpinski-Gasket/"
                    h3="3D Sierpinski Gasket"
                    p="WebGL Application"
                />
                <ProjectCard
                    src="/projects/creditcard.webp"
                    link="https://github.com/danishayman/Credit-Card-Fraud-Detection/blob/main/FraudDetection.ipynb"
                    h3="Credit Card Fraud Detection"
                    p="Machine Learning Model"
                />

            </div>
        </section>
    );
} 