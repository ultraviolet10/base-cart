
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {


  return (
    <div className="min-h-screen min-w-screen rounded-lg flex flex-col p-4 border-[1px] border-black">
      <section className='flex-1 border-[1px] border-black'></section>
    </div>
  )
}
