export interface TitleWithSubTextProps {
  title: string
  subText: string
}


export const TitleWithSubText = ({ title, subText }: TitleWithSubTextProps) => {
  return (
    <div className="flex flex-col justify-center">
        <span className="text-sm font-medium leading-tight text-[#0E121B]">{title}</span>
        <span className="text-xs pt-1 leading-tight text-[#525866]">{subText}</span>
    </div>
  )
}
