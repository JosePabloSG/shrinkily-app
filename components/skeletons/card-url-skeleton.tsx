import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

const CardUrlSkeleton = () => {
  return (
    <Card className="w-full h-full flex flex-col bg-white border-gravel-100 shadow-sm">
      <CardHeader className="space-y-4 flex-grow p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex gap-1.5">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
        <Separator className="bg-gravel-100" />
        <CardContent className="p-0">
          <div className="flex items-center gap-4 flex-wrap">
            <Skeleton className="h-4 w-24" />
            <Separator orientation="vertical" className="h-4 bg-gravel-200" />
            <Skeleton className="h-4 w-20" />
            <Separator orientation="vertical" className="h-4 bg-gravel-200" />
            <div className="flex items-center gap-2 flex-wrap">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default CardUrlSkeleton

