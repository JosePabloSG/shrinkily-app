import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AlertCircle } from 'lucide-react';
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ProfileProps {
  name: string;
  email: string;
  image?: string;
}

export function Profile({ name, email, image }: ProfileProps) {
  return (
    <div className="space-y-6 w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <Avatar className="h-20 w-20 flex-shrink-0">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-medium text-gravel-900 break-words">{name}</h3>
          <p className="text-sm text-gravel-700 break-all">{email}</p>
        </div>
      </div>
      <div className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gravel-700 block">
            Your name
          </Label>
          <Input
            id="name"
            defaultValue={name}
            disabled
            className="w-full bg-dull-lavender-50 text-gravel-900 placeholder-gravel-500 focus:ring-blue-violet-500"
          />
          <p className="flex items-center text-xs text-gravel-500">
            <AlertCircle className="mr-1 h-4 w-4 flex-shrink-0" />
            <span>Name is managed by your OAuth provider.</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gravel-700 block">
            Your email
          </Label>
          <Input
            id="email"
            type="email"
            defaultValue={email}
            disabled
            className="w-full bg-dull-lavender-50 text-gravel-900 placeholder-gravel-500"
          />
          <p className="flex items-center text-xs text-gravel-500">
            <AlertCircle className="mr-1 h-4 w-4 flex-shrink-0" />
            <span>Email address is managed by your OAuth provider.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

