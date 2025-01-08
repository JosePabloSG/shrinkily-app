import { getUrlsWithTagsByUser } from "@/server/queries";

export default async function UrlsPage() {
  const data = await getUrlsWithTagsByUser();
  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}