/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 15:03:15
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 16:30:17
 * @Description: 请填写简介
 */

import * as d3 from 'd3'

export const canvasDrag = () => {
  ['#leftCanvas', '#rightCanvas'].forEach((canvas) => {
    let size = 1
    d3.select(canvas)
      .on('wheel', function (event: any) {
        if (event.deltaY < 0) {
          d3.select(canvas)
            .select('#scale')
            .attr('transform', `scale(${size *= 1.05})`)
            .attr('size', size)
        } else {
          d3.select(canvas)
            .select('#scale')
            .attr('transform', `scale(${size *= 0.95})`)
            .attr('size', size)
        }
      }).call(
        d3.drag<any, unknown>()
          .on('start', function () {
            d3.select(this).style('cursor', 'pointer')
          })
          .on('drag', function (event: any) {
            const currentElement = d3.select(this).select('#drag')
            const tempArr = currentElement.attr("transform").split(",");
            // 获取当前的x和y坐标
            const x = +(tempArr?.[0]?.split("(")[1] || 0);
            const y = +(tempArr?.[1]?.split(")")[0] || 0);
            // 当前坐标加上拖拽的相对坐标
            // 即新坐标相比原坐标的偏移量
            currentElement.attr(
              "transform",
              `translate(${x + event.dx / size}, ${y + event.dy / size})`
            );

            currentElement
              .attr('x', x + event.dx / size)
              .attr('y', y + event.dy / size)
          })
          .on('end', function () {
            d3.select(this).style('cursor', 'auto')
          })
      )
  })
}