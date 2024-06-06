import React from 'react'
import { Card } from '@tremor/react';

export const ListCard = ({image,foodName, onClick}) => {

  return (
    <Card className="mx-auto max-w-xs py-2 bg-white rounded-md h-[215px] w-[200px] cursor-pointer hover:origin-top hover:bg-slate-50 hover:translate-y-[-1px] transition-all"
      onClick={onClick}>
        <div className='flex flex-col items-center justify-between py-2'>
          <img className='bg-slate-400 w-[220px] h-[120px] rounded-xl object-cover' src={image} alt="food"/>
          <p className='text-wrap mt-3 text-[0.70rem]'>{foodName}</p>
        </div>
    </Card>
  )
}

