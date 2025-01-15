export default function PublicChannelPage({
  params
}: {
  params: { name: string }
}) {
  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1>Public Channel: {params.name}</h1>
      {/* Add your public channel content here */}
    </div>
  )
}
