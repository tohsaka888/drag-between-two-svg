/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 08:30:57
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 15:04:39
 * @Description: 请填写简介
 */
import useScreenSize from '@hooks/useScreenSize'
import React, { useEffect } from 'react'
import { createNode } from './createNode'

function LeftCanvas() {
  const { width, height } = useScreenSize()

  useEffect(() => {
    createNode()
  }, [])

  return (
    <svg width={width / 2} height={height} id="leftCanvas" style={{borderRight: '1px solid'}}>
      <g id="scale">
        <g id="drag"></g>
      </g>
    </svg>
  )
}

export default LeftCanvas