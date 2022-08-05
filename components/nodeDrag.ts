/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 09:07:02
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 17:16:56
 * @Description: 请填写简介
 */

import * as d3 from 'd3'

const dragEnd = (current: any, e: any, part: 'left' | 'right') => {
  const otherSize = +d3.select<SVGSVGElement, any>(`#${part === 'left' ? 'right' : 'left'}Canvas`).select('#scale').attr('size') || 1
  const currentSize = +d3.select<SVGSVGElement, any>(`#${part}Canvas`).select('#scale').attr('size') || 1
  const currentCanvas = d3.select<SVGSVGElement, any>(`#${part}Canvas`).node()?.getBoundingClientRect()!
  const otherCanvas = d3.select<SVGSVGElement, any>(`#${part === 'left' ? 'right' : 'left'}Canvas`).node()?.getBoundingClientRect()!
  const fromTranslateX = +d3.select<SVGSVGElement, any>(`#${part}Canvas`).select('#drag').attr('x') || 0
  const fromTranslateY = +d3.select<SVGSVGElement, any>(`#${part}Canvas`).select('#drag').attr('y') || 0
  const toTranslateX = +d3.select<SVGSVGElement, any>(`#${part === 'left' ? 'right' : 'left'}Canvas`).select('#drag').attr('x') || 0
  const toTranslateY = +d3.select<SVGSVGElement, any>(`#${part === 'left' ? 'right' : 'left'}Canvas`).select('#drag').attr('y') || 0

  const isInArea =
    part === 'left'
      ? (e.x + fromTranslateX) * currentSize > currentCanvas.width
      : e.x + fromTranslateX < 0
  const x =
    part === 'left'
      ? ((e.x + fromTranslateX) * currentSize - otherCanvas.left) / otherSize - toTranslateX
      : (currentCanvas.left + (e.x + fromTranslateX) * currentSize) / otherSize - toTranslateX
  const y = (e.y + fromTranslateY) * currentSize / otherSize - toTranslateY

  if (isInArea) {
    const clonedNodeContainer =
      d3.select(current)
        .clone(true)  // 复制自身同时复制子节点
        .classed('clonedNodeContainer', true)

    clonedNodeContainer
      .selectAll('circle')
      .attr('cx', x)
      .attr('cy', y)
      .style('cursor', 'pointer')

    clonedNodeContainer
      .select('.name')
      .attr('x', x)
      .attr('y', y)
      .style('cursor', 'pointer')

    clonedNodeContainer
      .select('.label')
      .attr('x', x)
      .attr('y', y + 35)
      .style('cursor', 'pointer')

    const clonedNode = clonedNodeContainer.node() as SVGGElement
    d3.select(`#${part === 'left' ? 'right' : 'left'}Canvas`).select<any>('#drag').node()?.append(clonedNode)
    d3.select(`#${part}Canvas`).selectAll('.clonedNodeContainer').remove()
    d3.select(`#${part === 'left' ? 'right' : 'left'}Canvas`).selectAll('.clonedNodeContainer').attr('class', `${part === 'left' ? 'right' : 'left'}-node`)

    // 移动后是否删除原节点
    // 根据不同场景决定是否删除
    d3.select(current).remove()
  } else {
    const currentNode = d3.select(current)
    currentNode
      .select('circle')
      .attr('cx', e.x)
      .attr('cy', e.y)

    currentNode
      .select('.name')
      .attr('x', e.x)
      .attr('y', e.y)

    currentNode
      .select('.label')
      .attr('x', e.x)
      .attr('y', e.y + 35)
  }
}

export const nodeDrag = async (part: 'left' | 'right') => {
  // Tips:
  // 如果svg不是在页面最左上角,需计算影响svg的元素的宽高
  // 如: 全局有个Header或者Sider

  let offsetX: number = 0
  let offsetY: number = 0

  d3.selectAll(`.${part}-node`)
    .call(
      d3.drag<any, any>()
        .on('start', function (e) {
          const size = +d3.select<SVGSVGElement, any>(`#${part}Canvas`).select('#scale').attr('size') || 1
          const translateX = +d3.select<SVGSVGElement, any>(`#${part}Canvas`).select('#drag').attr('x') || 0
          const translateY = +d3.select<SVGSVGElement, any>(`#${part}Canvas`).select('#drag').attr('y') || 0
          if (part === 'right') {
            offsetX += document.getElementById('leftCanvas')?.getBoundingClientRect().width as number
          }
          const clonedNodeContainer =
            d3.select(this)
              .clone(true)  // 复制自身同时复制子节点
              .classed('clonedNodeContainer', true)

          clonedNodeContainer
            .selectAll('circle')
            .attr('cx', 25)
            .attr('cy', 25)
            .style('cursor', 'pointer')

          clonedNodeContainer
            .select('.name')
            .attr('x', 25)
            .attr('y', 25)
            .style('cursor', 'pointer')

          clonedNodeContainer
            .select('.label')
            .attr('x', 25)
            .attr('y', 25 + 35)
            .style('cursor', 'pointer')

          const clonedNode = clonedNodeContainer.node() as SVGGElement

          const moveContainer =
            d3.select('body')
              .insert('div', ':first-child')
              .style('position', 'fixed')
              .style('width', '100px')
              .attr('height', '100px')
              .style('z-index', 100)
              .style('background-color', 'transparent')
              // 这里25是半径
              // 计算公式: e.x + offsetX - r
              .style('transform', `translate3d(${(e.x + translateX) * size - 25 + offsetX}px,${(e.y + translateY) * size - 25 + offsetY}px, 0)`) // 开启GPU加速,优化性能
              .attr('id', 'move-temp')

          moveContainer
            .append('svg')
            .attr('id', 'move-temp-svg')

          document.getElementById('move-temp-svg')?.append(clonedNode)
        })
        .on('drag', (e) => {
          requestAnimationFrame(() => {
            const size = +d3.select<SVGSVGElement, any>(`#${part}Canvas`).select('#scale').attr('size') || 1
            const translateX = +d3.select<SVGSVGElement, any>(`#${part}Canvas`).select('#drag').attr('x') || 0
            const translateY = +d3.select<SVGSVGElement, any>(`#${part}Canvas`).select('#drag').attr('y') || 0
            d3.select('#move-temp')
              .style('transform', `translate3d(${(e.x + translateX) * size - 25 + offsetX}px,${(e.y + translateY) * size - 25 + offsetY}px, 0)`)
          })
        })
        .on('end', function (this, e) {
          dragEnd(this, e, part)
          // 删除移动
          d3.select('#move-temp').remove()

          offsetX = 0
          offsetY = 0

          nodeDrag(part === 'left' ? 'right' : 'left')
        })
    )
}
