type FallbackPageProps = {
  title: string
  message: string
}

export default function FallbackPage({ title, message }: FallbackPageProps) {
  return (
    <main>
      <h1>{title}</h1>
      <p>{message}</p>
    </main>
  )
}