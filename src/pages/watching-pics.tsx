import WatchPics from '../components/watch-photo'
import { useParams } from 'react-router-dom'

function WatchingPics() {
  
  const {id} = useParams()

  return (
    <div>
      <WatchPics id={id!}/>
      <h2>hi</h2>
    </div>
  )
}

export default WatchingPics
