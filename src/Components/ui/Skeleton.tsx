import React from 'react';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'card';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
}

/**
 * Reusable skeleton loading placeholder component.
 *
 * @param variant   - Shape: 'text', 'circular', 'rectangular', or 'card'
 * @param width     - Override width
 * @param height    - Override height
 * @param className - Additional CSS classes
 * @param count     - Number of skeleton lines (for 'text' variant)
 */
const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  count = 1,
}) => {
  const baseClasses = 'animate-shimmer rounded';

  const variantClasses: Record<SkeletonVariant, string> = {
    text: 'h-4 rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl',
  };

  const style: React.CSSProperties = {
    width: width ?? '100%',
    height: height ?? (variant === 'text' ? '1em' : variant === 'circular' ? width : '100%'),
  };

  if (variant === 'text' && count > 1) {
    return (
      <div className={`space-y-2.5 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses.text}`}
            style={{
              ...style,
              width: i === count - 1 ? '75%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

/** Pre-built skeleton for article cards */
export const ArticleCardSkeleton: React.FC = () => (
  <div className="card-elevated overflow-hidden">
    <Skeleton variant="rectangular" height={200} />
    <div className="p-4 space-y-3">
      <div className="flex gap-1.5">
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={80} height={20} />
      </div>
      <Skeleton variant="text" count={2} />
      <Skeleton variant="text" width="60%" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton variant="text" width={100} height={14} />
        <Skeleton variant="text" width={80} height={14} />
      </div>
    </div>
  </div>
);

/** Pre-built skeleton for horizontal news items */
export const HorizontalCardSkeleton: React.FC = () => (
  <div className="flex gap-3 py-4 border-b border-gray-100">
    <Skeleton variant="rectangular" width={140} height={90} className="flex-shrink-0 rounded-lg" />
    <div className="flex-1 space-y-2 py-1">
      <Skeleton variant="text" width={60} height={18} />
      <Skeleton variant="text" count={2} />
    </div>
  </div>
);

export default Skeleton;
