export const getUniqueNodeId = (nodeData, nodes) => {
  // Get amount of same nodes
  let totalSameNodes = 0
  for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i]
      if (node.data.name === nodeData.name) {
          totalSameNodes += 1
      }
  }

  // Get unique id
  let nodeId = `${nodeData.name}_${totalSameNodes}`
  for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i]
      if (node.id === nodeId) {
          totalSameNodes += 1
          nodeId = `${nodeData.name}_${totalSameNodes}`
      }
  }
  return nodeId
}