const differ = require("deep-diff")

// https://github.com/flitbit/diff#differences
const dictionary = {
  E: {
    text: "CHANGED",
  },
  N: {
    text: "ADDED",
  },
  D: {
    text: "DELETED",
  },
  A: {
    text: "ARRAY",
  },
}

function withColor(color) {
  return `color: ${color}; font-weight: bold`
}
function titleStyle(namespace) {
  return [`%c ${namespace}`, withColor("#08b"), "Model"]
}

function render(diff) {
  const { kind, path, lhs, rhs, index, item } = diff
  const str1 = path && path.join(".")
  switch (kind) {
    case "E":
      return [str1, lhs, "→", rhs]
    case "N":
      return [str1, rhs]
    case "D":
      return [str1]
    case "A":
      return [`${str1}[${index}]`, item]
    default:
      return []
  }
}

function excludeFn(obj) {
  if (!obj) return obj
  return Object.keys(obj).reduce((result, key) => {
    if (typeof obj[key] !== "function") {
      result[key] = obj[key]
    }
    return result
  }, {})
}

module.exports = function logger(
  originalPrevState,
  originalNewState,
  namespace,
  logger = console,
  isCollapsed = false,
) {
  const prevState = excludeFn(originalPrevState)
  const newState = excludeFn(originalNewState)
  const diff = differ(prevState, newState)

  try {
    if (isCollapsed) {
      logger.groupCollapsed(...titleStyle(namespace))
    } else {
      logger.group(...titleStyle(namespace))
    }
  } catch (e) {
    logger.log(...titleStyle(namespace))
  }

  logger.log("%c prevState", withColor("#9E9E9E"), prevState)

  if (diff) {
    const diffObj = {}
    diff.forEach(elem => {
      const { kind } = elem
      const output = render(elem)
      diffObj[dictionary[kind].text] = output
        .filter(m => m !== null && m !== undefined)
        .map(m => {
          if (typeof m === "object") {
            return JSON.stringify(m)
          }
          return m
        })
        .join(" ")
    })
    logger.log("%c diff", withColor("#ca4000"), diffObj)
  } else {
    logger.log("%c diff", withColor("#ca4000"), "—— no diff ——")
  }

  logger.log("%c nextState", withColor("#4CAF50"), newState)

  try {
    logger.groupEnd()
  } catch (e) {
    logger.log("—— end —— ")
  }
}
