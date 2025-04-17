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
        <span className={`text-sm font-medium leading-tight break-words text-[#0E121B] ${titleClassName || ''}`}>{title}</span>
        <span className={`text-xs pt-1 leading-tight break-words text-[#525866] ${subTextClassName || ''}`}>{subText}</span>
    </div>
  )
}
