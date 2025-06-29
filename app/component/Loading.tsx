'use client';

import { useTheme } from '../common/ThemeContext';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  const { theme } = useTheme();

  const containerClass = fullScreen 
    ? "fixed inset-0 z-[1001] flex items-center justify-center bg-[var(--background-color)] bg-opacity-90"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-[var(--text-color)] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-medium text-[var(--text-color)]">Loading...</p>
      </div>
    </div>
  );
};

export default Loading; 