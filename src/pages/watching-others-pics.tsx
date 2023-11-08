import WatchOtherPics from '../components/watch-others-pic'
import { useParams } from 'react-router-dom'

function WatchingPics() {
  
  const {id} = useParams()

  return (
    <div>
      <WatchOtherPics id={id!}/>
    </div>
  )
}

export default WatchingPics
