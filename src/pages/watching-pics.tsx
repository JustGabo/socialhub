import WatchPics from '../components/watch-photo'
import { useParams } from 'react-router-dom'

function WatchingPics() {
  
  const {id} = useParams()

  return (
    <div>
      <WatchPics id={id!}/>
    </div>
  )
}

export default WatchingPics
