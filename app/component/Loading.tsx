'use client';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 z-1001 flex items-center justify-center nb-grid bg-nb-bg text-nb-ink'
    : 'flex items-center justify-center p-8 text-nb-ink';

  return (
    <div className={containerClass} role="status">
      <div className="flex flex-col items-center gap-4">
        {/* 8-bit progress bar: blocks blink in sequence */}
        <div className="flex gap-1.5 p-1.5 bg-nb-card border-[3px] border-nb-ink shadow-hard-4">
          {['bg-nb-yellow', 'bg-nb-sky', 'bg-nb-pink', 'bg-nb-green', 'bg-nb-orange'].map((bg, i) => (
            <span key={bg} className={`w-4 h-4 ${bg} animate-blink`} style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <p className="font-pixel text-[10px]">LOADING...</p>
      </div>
    </div>
  );
};

export default Loading;
