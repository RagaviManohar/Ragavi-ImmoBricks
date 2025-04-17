import React from 'react'

export interface TitleWithSubTextProps {
  title: string
  subText: string
  titleClassName?: string
  subTextClassName?: string
}


export const TitleWithSubText = ({ 
  title, 
  subText, 
  titleClassName,
  subTextClassName 
}: TitleWithSubTextProps) => {
  return (
    <div className="flex flex-col justify-center h-full">
        <span className={`text-sm font-medium leading-tight break-words text-neutral-950 ${titleClassName || ''}`}>{title}</span>
        <span className={`text-xs pt-1 leading-tight break-words text-neutral-600 ${subTextClassName || ''}`}>{subText}</span>
    </div>
  )
}
