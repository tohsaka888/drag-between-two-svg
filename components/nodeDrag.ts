/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 09:07:02
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 11:20:05
 * @Description: 请填写简介
 */

import * as d3 from 'd3'
import { cloneDeep } from 'lodash'

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
              .style('transform', `translate3d(${e.x + offsetX - 25}px, ${e.y + offsetY - 25}px, 0)`) // 开启GPU加速,优化性能
              .attr('id', 'move-temp')

          moveContainer
            .append('svg')
            .attr('id', 'move-temp-svg')

          document.getElementById('move-temp-svg')?.append(clonedNode)
        })
        .on('drag', (e) => {
          requestAnimationFrame(() => {
            d3.select('#move-temp')
              .style('transform', `translate3d(${e.x - 25 + offsetX}px,${e.y - 25 + offsetY}px, 0)`)
          })
        })
        .on('end', function (e) {
          if (part === 'left') {
            const rightCanvas = document.getElementById('rightCanvas') as HTMLElement
            const offsetX = rightCanvas.getBoundingClientRect().left
            if (e.x > rightCanvas.getBoundingClientRect().left && e.x < rightCanvas.getBoundingClientRect().left + rightCanvas.getBoundingClientRect().width) {
              const clonedNodeContainer =
                d3.select(this)
                  .clone(true)  // 复制自身同时复制子节点
                  .classed('clonedNodeContainer', true)

              clonedNodeContainer
                .selectAll('circle')
                .attr('cx', e.x - offsetX)
                .attr('cy', e.y)
                .style('cursor', 'pointer')

              clonedNodeContainer
                .select('.name')
                .attr('x', e.x - offsetX)
                .attr('y', e.y)
                .style('cursor', 'pointer')

              clonedNodeContainer
                .select('.label')
                .attr('x', e.x - offsetX)
                .attr('y', e.y + 35)
                .style('cursor', 'pointer')

              const clonedNode = clonedNodeContainer.node() as SVGGElement
              rightCanvas.append(clonedNode)
              d3.select('#leftCanvas').selectAll('.clonedNodeContainer').remove()
              d3.select('#rightCanvas').selectAll('.clonedNodeContainer').attr('class', 'newNode')
            }
          } else {
            if (e.x < 0) {
              console.log('ok')
              const rightCanvas = document.getElementById('leftCanvas') as HTMLElement
              const offsetX = rightCanvas.getBoundingClientRect().left

              const clonedNodeContainer =
                d3.select(this)
                  .clone(true)  // 复制自身同时复制子节点
                  .classed('clonedNodeContainer', true)

              clonedNodeContainer
                .selectAll('circle')
                .attr('cx', rightCanvas.getBoundingClientRect().width + e.x)
                .attr('cy', e.y)
                .style('cursor', 'pointer')

              clonedNodeContainer
                .select('.name')
                .attr('x', rightCanvas.getBoundingClientRect().width + e.x)
                .attr('y', e.y)
                .style('cursor', 'pointer')

              clonedNodeContainer
                .select('.label')
                .attr('x', rightCanvas.getBoundingClientRect().width + e.x)
                .attr('y', e.y + 35)
                .style('cursor', 'pointer')

              const clonedNode = clonedNodeContainer.node() as SVGGElement
              rightCanvas.append(clonedNode)
              d3.select('#rightCanvas').selectAll('.clonedNodeContainer').remove()
              d3.select('#leftCanvas').selectAll('.clonedNodeContainer').attr('class', 'newNode')
            }

          }

          // 删除移动
          d3.select('#move-temp').remove()

          offsetX = 0
          offsetY = 0
        })
    )
}
