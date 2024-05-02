import Counter from '@/components/my_components/counter'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function DescriptionRoute() {
  return (
    <>
      <div className='w-[50%] mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>Now give a description of your home</h2>
      </div>

      <form>
        <div className="flex flex-col w-[50%] mx-auto mt-10 mb-36 gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>Title:</Label>
            <Input name='title' type='text' placeholder='Enter the title' required/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description:</Label>
            <Textarea name='description' placeholder='Description...' required/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price:</Label>
            <Input name='price' type='number' placeholder='Price per day in PLN' required min={1000}/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image:</Label>
            <Input name='image' type='file' placeholder='Upload images' required min={1000}/>
          </div>
          <Card>
            <CardHeader className='flex flex-col gap-y-5'>
              <div className="flex item-center justify-between">
                <div className="flex flex-col">
                  <h1 className='font-semibold text-base'>Guests</h1>
                  <p className='text-muted-foreground text-sm'>How many guests are allowed?</p>
                </div>
                <Counter/>
              </div>
              <div className="flex item-center justify-between">
                <div className="flex flex-col">
                  <h1 className='font-semibold text-base'>Bedrooms</h1>
                  <p className='text-muted-foreground text-sm'>How many guests are allowed?</p>
                </div>
                <Counter/>
              </div>
              <div className="flex item-center justify-between">
                <div className="flex flex-col">
                  <h1 className='font-semibold text-base'>Bathrooms</h1>
                  <p className='text-muted-foreground text-sm'>How many guests are allowed?</p>
                </div>
                <Counter/>
              </div>
            </CardHeader>
          </Card>
        </div>
      </form>
    </>
  )
}

export default DescriptionRoute
