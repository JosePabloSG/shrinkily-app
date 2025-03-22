import { auth } from "@/auth"
import { UserForm } from "@/components/settings/user-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ExportURLsCard from "@/components/settings/export-urls"
import DeleteAccountCard from "@/components/settings/delete-account"
import { getTranslations } from "next-intl/server"

export default async function Page() {
  const t = await getTranslations('user-form')
  const session = await auth()

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const userData = session.user

  return (
    <div className="min-h-screen bg-dull-lavender-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gravel-900">
                {t('cardTitle')}
              </CardTitle>
              <CardDescription className="text-sm text-gravel-700">
                {t('cardSubtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserForm
                name={userData.name ?? 'Anonymous'}
                email={userData.email ?? ''}
                image={userData.image ?? '/placeholder.svg?height=100&width=100'}
              />
            </CardContent>
          </Card>

          <ExportURLsCard />

          <DeleteAccountCard email={userData.email ?? ''} />

        </div>
      </div>
    </div>
  )
}

