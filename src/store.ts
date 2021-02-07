import compare from "react-fast-compare"

type CallbackManageType = Record<string, Array<Function> | undefined>

function callbackManageFactory(obj: CallbackManageType) {
  return (namespace: string, callback: Function) => {
    if (!obj[namespace]) {
      obj[namespace] = []
    }
    obj[namespace]!.push(callback)
    return () => {
      obj[namespace] = obj[namespace]!.filter((cb) => cb !== callback)
    }
  }
}

function createStore() {
  const callbacks: CallbackManageType = {}
  const data: Record<string, any> = {}
  const subscribes: CallbackManageType = {}

  const update = (namespace: string, nextState: Record<string, any>) => {
    const preState = data[namespace]
    const allSubs = (subscribes["@@all"] || []).concat(
      subscribes[namespace] || [],
    )
    if (!!allSubs.length) {
      allSubs.forEach((s) => {
        s(preState, nextState, namespace)
      })
    }
    // Each namespace only contrast once
    if (!compare(preState, nextState)) {
      data[namespace] = nextState
      const cbs = callbacks[namespace]
      if (cbs?.length) {
        cbs.forEach((callback: Function) => {
          try {
            callback(nextState)
          } catch (e) {
            callback(undefined)
          }
        })
      }
    }
  }

  const addCallback = callbackManageFactory(callbacks)
  const subscribe = callbackManageFactory(subscribes)
  return {
    update,
    subscribe,
    addCallback,
    data,
  }
}

export default createStore
