export default function ChannelLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Channel-specific header if needed */}
      <main className="container mx-auto px-4 py-8">{children}</main>
      {/* Channel-specific footer if needed */}
    </div>
  )
}
