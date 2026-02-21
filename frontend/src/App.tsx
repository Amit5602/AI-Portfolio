import { useState } from "react";
import { motion } from "framer-motion";
import Chat from "./components/Chat";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const skills = [
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "MongoDB",
    "Laravel",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F19] text-white">

      {/* Background Glow Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-30 -top-20 -left-20"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-30 bottom-0 right-0"></div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-5 py-2 bg-blue-600 rounded-full hover:scale-105 transition shadow-lg"
        >
          Toggle Theme
        </button>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-4">

        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src="/profile.jpg"
          alt="Amit"
          className="w-36 h-36 rounded-full mb-6 border-4 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.6)]"
        />

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-extrabold tracking-tight"
        >
          Amit Kumar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-xl text-gray-400"
        >
          Full Stack Developer | AI Enthusiast
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex gap-4"
        >
          <button className="px-8 py-3 bg-blue-600 rounded-full hover:scale-105 hover:bg-blue-500 transition shadow-lg">
            View Projects
          </button>

          <button className="px-8 py-3 border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition">
            Chat With My AI
          </button>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-20 px-6 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed opacity-80">
          I am a Full Stack Developer passionate about building scalable web
          applications and integrating AI-powered solutions. I specialize in
          React, TypeScript, Python, FastAPI, and modern backend architectures.
        </p>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-20 px-6 text-center"
      >
        <h2 className="text-4xl font-bold mb-10">Skills</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="group relative bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 cursor-pointer"
            >
              <span className="group-hover:text-blue-400 transition text-lg font-medium">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Chat />
    </div>
  );
}

export default App;