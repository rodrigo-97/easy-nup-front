import { IconBaseProps } from 'react-icons'
import { IconType } from 'react-icons/lib'

type Props = {
  title: string
  icon: React.ElementType<IconBaseProps>
  onClick: () => void
}

export function Tile({ onClick, title, icon: Icon }: Props) {
  return (
    <div className='tile d-flex align-items-center gap-3 text-primary-700' onClick={onClick}>
      <Icon size={20} />
      {title}
    </div>
  )
}