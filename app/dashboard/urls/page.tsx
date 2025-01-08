import { Button } from "@/components/ui/button";
import { CreateUrl } from "@/components/urls/create-url";
import { getUrlsWithTagsByUser } from "@/server/queries";
import { PlusIcon } from "lucide-react";

const DashboardUrls = async () => {
  const data = await getUrlsWithTagsByUser();
  if (!data) {
    return <div>Error</div>;
  }

  if (!data?.urls) {
    return <div>Error</div>;
  }

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <CreateUrl tags={data?.tags}>
        <Button>
          <PlusIcon size={16} />
          <span>
            Create URL
          </span>
        </Button>
      </CreateUrl>
    </div>
  )
}

export default DashboardUrls;