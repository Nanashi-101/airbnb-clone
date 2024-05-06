import { FileSlidersIcon } from 'lucide-react'

function NoItems() {
  return (
    <div className='flex min-h-[400px] items-center justify-center flex-col rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10'>
      <div className='flex gap-2 items-center justify-center h-20 w-20 rounded-full bg-primary/10'>
        <FileSlidersIcon className='h-10 w-10 text-primary'/>
      </div>
      <h2 className='mt-6 text-xl font-semibold'>No listings of this category found...</h2>
      <p className='mt-4 text-sm leading-4 text-muted-foreground font-semibold'>Please check other categories or create your own listing!</p>
    </div>
  )
}

export default NoItems
