/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 08:43:18
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 16:58:11
 * @Description: 请填写简介
 */

import * as d3 from 'd3'
import { mockFakeData } from 'mock/mockNodeData'

export const createNode = () => {
  const nodes = mockFakeData(30)
  nodes.forEach((node, index) => {
    const x = Math.random() * 30 * 50
    const y = Math.random() * 30 * 50
    const nodeContainer =
      d3.select('#leftCanvas')
        .select('#drag')
        .append('g')
        .classed('left-node', true)
        .attr('x', x)
        .attr('y', y)

    nodeContainer
      .append('circle')
      .attr('r', 25)
      .attr('cx', x)
      .attr('cy', y)
      .attr('fill', '#1890ff')
      .attr('stroke', 'blue')

    nodeContainer
      .append('text')
      .text(node.name)
      .attr('x', x)
      .attr('y', y)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', '#fff')
      .attr('font-size', 14)
      .classed('name', true)

    nodeContainer
      .append('text')
      .text(node.label)
      .attr('x', x)
      .attr('y', y + 35)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', 12)
      .classed('label', true)
  })
}
