export default function LoadingFallback() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes loadingSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loading-spinner {
            animation: loadingSpin 1s linear infinite;
          }
        `
      }} />
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'opacity 0.3s ease-out',
        }}
        id="loading-fallback"
      >
        <div 
          className="loading-spinner"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #007bff, #ffffff)',
          }}
        />
      </div>
    </>
  );
}
