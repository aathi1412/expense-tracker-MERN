import {getInitials} from '../../utils/helper'

function CharAvatar({ fullName }) {
  return (
    <div className='w-20 h-20 flex items-center justify-center rounded-full bg-slate-200'>
        { getInitials(fullName) }
    </div>
  )
}

export default CharAvatar