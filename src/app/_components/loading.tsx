import { SVGSkeleton, Skeleton } from "./skeleton";

export const LoadingSkeleton = () => (
  <>
    <div className="flex gap-4">
      <a>
        <div className="border border-slate-200 dark:border-slate-800 relative">
          <SVGSkeleton className="min-h-[200px] max-h-[201px] w-[320px] h-4" />
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="tracking-tight p-0">
              <Skeleton className="w-[72px] max-w-full" />
            </h3>
            <div className="flex items-center gap-2 p-0">
              <SVGSkeleton className="w-[1empx] h-[1empx]" />
              <div>
                <p>
                  <Skeleton className="w-[32px] max-w-full" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 p-0">
              <SVGSkeleton className="w-[1empx] h-[1empx]" />
              <div>
                <Skeleton className="w-[48px] max-w-full" />
              </div>
            </div>
            <div className="flex items-center gap-1 p-0">
              <SVGSkeleton className="w-[1empx] h-[1empx]" />
              <div>
                <Skeleton className="w-[16px] max-w-full" />
              </div>
            </div>
          </div>
          <div className="absolute flex items-center justify-center top-1 right-1 p-2">
            <SVGSkeleton className="w-[1empx] h-[1empx]" />
          </div>
        </div>
      </a>
      <a>
        <div className="border border-slate-200 dark:border-slate-800 relative">
          <SVGSkeleton className="min-h-[200px] max-h-[201px] w-[320px] h-4" />
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="tracking-tight p-0">
              <Skeleton className="w-[64px] max-w-full" />
            </h3>
            <div className="flex items-center gap-2 p-0">
              <SVGSkeleton className="w-[1empx] h-[1empx]" />
              <div>
                <p>
                  <Skeleton className="w-[24px] max-w-full" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 p-0">
              <SVGSkeleton className="w-[1empx] h-[1empx]" />
              <div>
                <Skeleton className="w-[64px] max-w-full" />
              </div>
            </div>
            <div className="flex items-center gap-1 p-0">
              <SVGSkeleton className="w-[1empx] h-[1empx]" />
              <div>
                <Skeleton className="w-[16px] max-w-full" />
              </div>
            </div>
          </div>
          <div className="absolute flex items-center justify-center top-1 right-1 p-2">
            <SVGSkeleton className="w-[1empx] h-[1empx]" />
          </div>
        </div>
      </a>
      <a>
        <div className="border border-slate-200 dark:border-slate-800 relative">
          <SVGSkeleton className="min-h-[200px] max-h-[201px] w-[320px] h-4" />
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="tracking-tight p-0">
              <Skeleton className="w-[88px] max-w-full" />
            </h3>
            <div className="flex items-center gap-2 p-0">
              <SVGSkeleton className="w-[1empx] h-[1empx]" />
              <div>
                <p>
                  <Skeleton className="w-[32px] max-w-full" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 p-0">
              <SVGSkeleton className="w-[1empx] h-[1empx]" />
              <div>
                <Skeleton className="w-[48px] max-w-full" />
              </div>
            </div>
            <div className="flex items-center gap-1 p-0">
              <SVGSkeleton className="w-[1empx] h-[1empx]" />
              <div>
                <Skeleton className="w-[14px] max-w-full" />
              </div>
            </div>
          </div>
          <div className="absolute flex items-center justify-center top-1 right-1 p-2">
            <SVGSkeleton className="w-[1empx] h-[1empx]" />
          </div>
        </div>
      </a>
    </div>
  </>
);

const SandboxPreview = () => (
  <div className="flex justify-center w-full h-full p-10">
    <LoadingSkeleton />
  </div>
);

export default SandboxPreview;
