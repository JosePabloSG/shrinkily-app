import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'

interface UserFormProps {
  name: string
  email: string
  image: string
}

export function UserForm({ name, email, image }: UserFormProps) {

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium text-gravel-900">{name}</h3>
          <p className="text-sm text-gravel-700">{email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gravel-700">
            Your name
          </Label>
          <Input
            id="name"
            defaultValue={name}
            disabled
            className="bg-dull-lavender-50 text-gravel-900 placeholder-gravel-500 focus:ring-blue-violet-500"
          />
          <p className="flex items-center text-xs text-gravel-500">
            <AlertCircle className="mr-1 h-4 w-4" />
            Name is managed by your OAuth provider.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gravel-700">
            Your email
          </Label>
          <Input
            id="email"
            type="email"
            defaultValue={email}
            disabled
            className="bg-dull-lavender-50 text-gravel-900 placeholder-gravel-500"
          />
          <p className="flex items-center text-xs text-gravel-500">
            <AlertCircle className="mr-1 h-4 w-4" />
            Email address is managed by your OAuth provider.
          </p>
        </div>
      </div>
    </div>
  )
}

