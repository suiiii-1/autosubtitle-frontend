interface ProgressProps {
  value: number;
  status: string;
}

export default function Progress({ value, status }: ProgressProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-primary transition-all duration-300">
          {status}
        </span>
        <span className="text-sm font-medium text-gray-500">{Math.round(value)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${value}%` }}
        >
          <div className="w-full h-full bg-white/20 animate-[shimmer_2s_infinite] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] bg-[length:200%_100%]"></div>
        </div>
      </div>
    </div>
  );
}
