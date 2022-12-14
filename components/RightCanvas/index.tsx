/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 08:31:24
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 16:25:20
 * @Description: 请填写简介
 */
import useScreenSize from '@hooks/useScreenSize'
import React, { useEffect } from 'react'
import { createNode } from './createNode'

function RightCanvas() {
  const { width, height } = useScreenSize()

  useEffect(() => {
    createNode()
  }, [])

  return (
    <svg width={width / 2} height={height} id='rightCanvas'>
      <g id='scale' transform='scale(1)'>
        <g id="drag" transform='translate(0, 0)'></g>
      </g>
    </svg>
  )
}

export default RightCanvas
