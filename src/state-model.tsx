import { FC, useEffect, useRef } from "react"
interface StateModelProps {
  hook: () => any
  onUpdate: (val: any) => void
  name: string
}

const StateModel: FC<StateModelProps> = props => {
  const { hook, onUpdate, name } = props

  const mounted = useRef(false)

  let data: any
  try {
    data = hook()
  } catch (e) {
    console.error(`invoking '${name || "unknown"}' model hook failed:`, e)
  }

  if (!mounted.current) {
    onUpdate(data)
  }

  useEffect(() => {
    if (mounted.current) {
      onUpdate(data)
    } else {
      mounted.current = true
    }
  })
  return null
}

export default StateModel
