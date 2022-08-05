/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 15:03:15
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 15:52:17
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
      })
  })
}