import React from 'react';
import ProjectCard from '../common/ProjectCard';

// Use your existing assets from the public folder
const Projects = () => {
    return (
        <section id="projects" className="py-16 md:py-24 min-h-[650px] flex flex-col items-center p-6 md:p-8 lg:p-16">
            <div className="section-header">
                <h2 className="text-4xl md:text-5xl font-rubik font-black tracking-normal">PROJECTS</h2>
            </div>


            <div className="flex flex-col items-center gap-4 pt-4 md:pt-5 lg:pt-8 md:flex-row md:flex-wrap md:justify-center md:gap-6 lg:gap-8">
                
                <ProjectCard
                    src="/assets/sgl.png"
                    link="https://spudin-game-list.vercel.app/"
                    h3="Spudin Game List"
                    p="Game Rating Platform"
                />

                <ProjectCard
                    src="/assets/EHS.png"
                    link="https://github.com/danishayman/EHS_PORTAL"
                    h3="Environment, Health & Safety Portal"
                    p="ASP.NET Application"
                />
                
                
                <ProjectCard
                    src="/assets/homestay.png"
                    link="https://tuahcemerlang.vercel.app/"
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
                    src="/assets/FETS.png"
                    link="https://github.com/danishayman/FireExtinguisherTrackingSystem"
                    h3="Fire Extinguisher Tracking System"
                    p="ASP.NET Application"
                />

                <ProjectCard
                    src="/assets/bird.webp"
                    link="https://github.com/danishayman/Flappy-Bird-AI"
                    h3="Flappy Bird AI"
                    p="Neural Network Model"
                />

                <ProjectCard
                    src="/assets/teapot.webp"
                    link="https://danishayman.github.io/3D-Objects-Playground/"
                    h3="3D Objects Playground"
                    p="WebGL Application"
                />

                <ProjectCard
                    src="/assets/speaker.webp"
                    link="https://github.com/danishayman/Speaker-Change-Detection/blob/main/Speaker-Change-Detection.ipynb"
                    h3="Speaker Change Detection"
                    p="Neural Network Model"
                />

                <ProjectCard
                    src="/assets/law.png"
                    link="https://github.com/danishayman/Law-Firm-Management"
                    h3="Law Firm Management"
                    p="JavaFx Application"
                />

                <ProjectCard
                    src="/assets/drink.png"
                    link="https://github.com/danishayman/drink-your-water-discord-bot"
                    h3="Drink Your Water"
                    p="Discord Bot"
                />

                <ProjectCard
                    src="/assets/tensorflow.webp"
                    link="https://github.com/danishayman/Low-Level-Tensorflow/blob/main/Low_Level_TF.ipynb"
                    h3="Low Level Tensorflow"
                    p="Neural Network Model"
                />

                <ProjectCard
                    src="/assets/gasket.webp"
                    link="https://danishayman.github.io/3D-Sierpinski-Gasket/"
                    h3="3D Sierpinski Gasket"
                    p="WebGL Application"
                />

                <ProjectCard
                    src="/assets/creditcard.png"
                    link="https://github.com/danishayman/Credit-Card-Fraud-Detection/blob/main/FraudDetection.ipynb"
                    h3="Credit Card Fraud Detection"
                    p="Machine Learning Model"
                />

                <ProjectCard
                    src="/assets/cervical.webp"
                    link="https://github.com/danishayman/Cervical-Cancer-Predictive-Model"
                    h3="Cervical Cancer Prediction"
                    p="Machine Learning Model"
                />
            </div>
        </section>
    );
};

export default Projects; 