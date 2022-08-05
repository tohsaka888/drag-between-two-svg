/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 08:46:30
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 08:50:16
 * @Description: 请填写简介
 */

export const mockFakeData = (nunberOfNodes: number) => {
  const nodes: Graph.Node[] = []
  for (let i = 0; i < nunberOfNodes; i++) {
    nodes.push({
      id: `node-${i}`,
      label: `node-${i}`,
      name: `节点${i}`
    })
  }
  return nodes
}