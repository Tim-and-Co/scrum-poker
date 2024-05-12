export default function Room({ params }: { params: { roomId: string } }) {
  return <main>Hello, {params.roomId} </main>;
}
