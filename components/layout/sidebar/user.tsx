import Image from "next/image";
import { useSession } from "next-auth/react";

export function User() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading" || !user) return <UserSkeleton />;
  if (!user) return null;

  return (
    <div className="flex items-center px-6 py-4 border-b border-dull-lavender-200 overflow-hidden">
      <div className="w-10 h-10 rounded-full bg-blue-violet-200 flex items-center justify-center flex-shrink-0">
        <Image src={user.image || "/placeholder.svg"} alt="Avatar" width={40} height={40} className="rounded-full" />
      </div>
      <div className="ml-3 min-w-0 flex-1">
        <p className="text-sm font-medium text-gravel-800 truncate">{user.name}</p>
        <p className="text-xs text-gravel-500 truncate">{user.email}</p>
      </div>
    </div>
  );
}

function UserSkeleton() {
  return (
    <div className="flex items-center px-6 py-4 border-b border-dull-lavender-200 overflow-hidden">
      <div className="w-10 h-10 rounded-full bg-blue-violet-200 flex items-center justify-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gravel-300 animate-pulse"></div>
      </div>
      <div className="ml-3 min-w-0 flex-1">
        <div className="h-4 bg-gravel-300 rounded w-24 mb-1 animate-pulse"></div>
        <div className="h-3 bg-gravel-300 rounded w-32 animate-pulse"></div>
      </div>
    </div>
  );
}
