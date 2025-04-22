export default function PaidLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <div className="paid-layout">
      {children}
    </div>
  )
}
