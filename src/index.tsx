import React, { FC, useState, useEffect, useRef, Fragment } from "react"
import StateModel from "./state-model"
import createStore from "./store"

export type Model<T extends Record<string, any>, K extends keyof T> = {
  [key in keyof T]: ReturnType<T[K]>
}

const store = createStore()

const init = <Models extends Record<string, any>>(models: Models) => {
  function useModel<T extends keyof Models>(namespace: T): Model<Models, T>[T]
  function useModel<T extends keyof Models, U>(
    namespace: T,
    selector: (model: Model<Models, T>[T]) => U,
  ): U

  function useModel<T extends keyof Models, U>(
    namespace: T,
    selector?: (model: Model<Models, T>[T]) => U,
  ) {
    const selectorRef = useRef(selector)
    selectorRef.current = selector
    const data = store.data[namespace as string]
    const [model, setModel] = useState(
      selectorRef.current ? selectorRef.current(data) : data,
    )
    const previousRef = useRef(model)
    previousRef.current = model

    useEffect(() => {
      const handler = (nextState: any) => {
        if (selectorRef.current) {
          nextState = selectorRef.current(nextState)
        }
        setModel(nextState)
      }
      return store.addCallback(namespace as string, handler)
    }, [namespace])

    return model
  }

  const Provider: FC = ({ children }) => {
    return (
      <Fragment>
        {Object.keys(models).map(key => (
          <StateModel
            key={key}
            name={key}
            hook={models[key]}
            onUpdate={(val: any) => {
              store.update(key, val)
            }}
          />
        ))}
        {children}
      </Fragment>
    )
  }

  function subscribe<T extends keyof Models>(
    namespace: T | ((preState: any, newState: any, ns?: T) => void),
    fn?: (preState: Model<Models, T>[T], newState: Model<Models, T>[T]) => void,
  ) {
    if (typeof namespace === "function") {
      fn = namespace
      // @ts-ignore
      namespace = "@@all"
    }
    return store.subscribe(namespace as string, fn!)
  }
  return {
    Provider,
    useModel,
    subscribe,
  }
}

export default init
