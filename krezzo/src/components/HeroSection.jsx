import { SparklesText } from "./ui/SparklesText";
import { BackgroundGradient } from "./ui/BackgroundGradient";
import { HoverCard } from "./ui/HoverCard";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-16">
        {/* Header with sparkles */}
        <div className="text-center">
          <SparklesText 
            className="text-6xl font-bold text-white"
            particleColor="#80FFDB"
          >
            Welcome to Krezzo
          </SparklesText>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            A modern React application built with Vite and styled with Tailwind CSS, featuring Aceternity UI components.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <BackgroundGradient className="p-4 h-full" gradientColor="rgba(128, 255, 219, 0.15)">
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-bold text-white mb-2">Modern Stack</h3>
              <p className="text-gray-300 flex-grow">
                Built with React 19, Vite 6, and Tailwind CSS 4 for blazing-fast development.
              </p>
            </div>
          </BackgroundGradient>

          <BackgroundGradient className="p-4 h-full" gradientColor="rgba(168, 85, 247, 0.15)">
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-bold text-white mb-2">Beautiful UI</h3>
              <p className="text-gray-300 flex-grow">
                Featuring Aceternity UI components with smooth animations and interactions.
              </p>
            </div>
          </BackgroundGradient>

          <BackgroundGradient className="p-4 h-full" gradientColor="rgba(59, 130, 246, 0.15)">
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-bold text-white mb-2">Fully Customizable</h3>
              <p className="text-gray-300 flex-grow">
                Easily extend and customize the UI components to fit your needs.
              </p>
            </div>
          </BackgroundGradient>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <HoverCard 
            content={
              <div className="bg-black border border-gray-800 p-4 rounded-lg shadow-lg">
                <p className="text-sm text-gray-300">
                  Check out more components in the Aceternity UI library!
                </p>
              </div>
            }
            direction="top"
          >
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200">
              Explore Components
            </button>
          </HoverCard>
        </div>
      </div>
    </div>
  );
} 