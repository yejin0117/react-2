export default async function getArtist(username:string): Promise<Playlist[]> {
  
  const res = await fetch (
    `https://jsonplasceholder.typicode.com/users?username=${encodeURIComponent(
      username
    )}`,
    { next: { revalidate: 60 } }
  )

  const users = await res.json()
  const user = Array.isArray(users) ? users[0] : undefined

  if (!user) {
    throw new Error(`Artist not found: ${username}`)
  }

  return {
    id: String(user.id),
    name: user.name ?? user.username
  }

}
