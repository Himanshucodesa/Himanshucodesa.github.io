import { useOutletContext } from 'react-router-dom'
import ShutterSequence from '../components/ShutterSequence.jsx'

export default function Home() {
  const { onStoryStepChange } = useOutletContext()
  return <ShutterSequence onStepChange={onStoryStepChange} />
}
