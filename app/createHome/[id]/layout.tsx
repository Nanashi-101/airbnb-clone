import React from 'react'

interface LayoutPropsType{
    children: React.ReactNode
}

function LayoutComponent({children}: LayoutPropsType) {
  return (
    <div className='mt-10'>
      {children}
    </div>
  )
}

export default LayoutComponent
