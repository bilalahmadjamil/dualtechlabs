import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style = {
    width: width || '100%',
    height: height || '1.2em',
  };

  return (
    <div
      className={`bg-slate-800/20 ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

// Portfolio card skeleton
export const PortfolioCardSkeleton = () => {
  return (
    <div className="relative block h-[420px] w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] sm:h-[450px] sm:w-[320px]">
      <div className="absolute inset-0 z-10 flex min-h-0 flex-col justify-between p-8">
        <div className="shrink-0">
          <Skeleton width="60%" height="1rem" className="mb-2" />
          <Skeleton width="80%" height="1.5rem" className="mb-2" />
          <Skeleton width="100%" height="1rem" />
        </div>

        <div className="relative flex h-40 w-full shrink-0 items-center justify-center p-3 sm:h-44">
          <div className="relative h-40 w-40">
            <Skeleton variant="circular" width="160px" height="160px" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <Skeleton width="60px" height="0.875rem" />
          <div className="mx-4 h-px flex-grow bg-white/10" />
          <Skeleton variant="rectangular" width="14px" height="14px" />
        </div>
      </div>
    </div>
  );
};

// Hero section skeleton
export const HeroSkeleton = () => {
  return (
    <div className="relative flex min-h-[calc(100dvh-5rem)] w-full items-center overflow-hidden bg-portal-void md:min-h-[calc(100dvh-5.5rem)]">
      <div className="relative z-10 portal-section grid grid-cols-12 items-center gap-8 py-6 sm:py-8 md:grid md:py-10 lg:py-12">
        <div className="col-span-12 space-y-8 md:space-y-10 lg:col-span-7">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Skeleton width="40px" height="1px" />
              <Skeleton width="200px" height="0.875rem" />
            </div>
            <Skeleton width="90%" height="4rem" className="hidden sm:block" />
            <Skeleton width="100%" height="3rem" className="sm:hidden" />
          </div>

          <Skeleton width="80%" height="1.5rem" className="border-l-2 border-cyan-500/35 pl-6 md:pl-8" />

          <div className="flex flex-wrap gap-4 pt-2 sm:gap-5">
            <Skeleton width="120px" height="2.5rem" className="rounded-full" />
            <Skeleton width="100px" height="2.5rem" className="rounded-full" />
          </div>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative glass space-y-7 rounded-2xl border border-white/[0.08] p-8 pl-6 shadow-card backdrop-blur-xl md:p-10 md:pl-8">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2 pl-2">
                  <Skeleton width="120px" height="0.875rem" />
                  <Skeleton width="100%" height="1.25rem" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Solutions section skeleton
export const SolutionsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 [contain:layout] md:grid-cols-4 md:gap-5">
      {/* Large card skeleton */}
      <div className="group flex min-h-[280px] flex-col justify-between p-8 md:col-span-2 md:row-span-2 md:min-h-[360px] md:p-12 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02]">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10">
          <Skeleton variant="circular" width="32px" height="32px" />
        </div>
        <div className="space-y-4">
          <Skeleton width="80%" height="2rem" />
          <Skeleton width="100%" height="1rem" />
          <Skeleton width="90%" height="1rem" />
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 pt-8">
          <Skeleton width="140px" height="0.875rem" />
        </div>
      </div>

      {/* Other card skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="group flex flex-col justify-center gap-6 p-8 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30">
            <Skeleton variant="circular" width="24px" height="24px" />
          </div>
          <div className="space-y-2">
            <Skeleton width="70%" height="1.25rem" />
            <Skeleton width="100%" height="0.875rem" />
          </div>
        </div>
      ))}
    </div>
  );
};
