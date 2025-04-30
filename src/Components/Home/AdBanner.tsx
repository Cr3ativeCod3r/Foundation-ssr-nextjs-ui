export const AdBanner: React.FC<{ className?: string; text?: string }> = ({ className, text = "Baner Reklama/Sponsor itp" }) => {
  return (
    <div className={`bg-gray-100 border border-gray-200 p-4 flex items-center justify-center mb-6 ${className}`}>
      <span className="text-gray-500">{text}</span>
    </div>
  );
};