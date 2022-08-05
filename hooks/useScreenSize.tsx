/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 08:32:57
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 09:27:38
 * @Description: 请填写简介
 */

import React, { useEffect, useState } from 'react'

function useScreenSize() {

  const [screenSize, setScreenSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight - 5 })

    window.addEventListener('resize', () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight - 5 })
    })

    return () => {
      window.removeEventListener('resize', () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight - 5 })
      })
    }
  }, [])

  return screenSize
}

export default useScreenSize
