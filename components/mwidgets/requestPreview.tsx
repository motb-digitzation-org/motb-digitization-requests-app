import { Skeleton } from "../ui/skeleton";

interface RequestPreviewProps {
  index: number;
}
export default function RequestPreview({ index }: RequestPreviewProps) {
  return (
    <div
      className={`${index % 2 ? `bg-white` : `bg-gray-100`} flex cursor-pointer items-start justify-between rounded-sm p-3 transition-colors duration-300 ease-in-out hover:bg-gray-300`}
    >
      <div>
        <p className="font-bold">Object Name</p>
        <p className="text-xs text-gray-700">Object Code</p>
      </div>
      <div>
        <div className="flex flex-row items-center gap-2">
          <p className="text-xs">Request Status</p>
          <div className="h-3 w-3 rounded-3xl border-2 border-green-400 bg-green-400"></div>
        </div>
        <p className="text-right text-xs text-gray-700">Request Type</p>
      </div>
    </div>
  );
}
