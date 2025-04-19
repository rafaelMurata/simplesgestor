import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function FreemiumLayout({
                                               children,
                                             }: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Layout anterior */}
    </div>
  )
}
