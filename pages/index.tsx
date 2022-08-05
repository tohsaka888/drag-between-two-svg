/*
 * @Author: tohsaka888
 * @Date: 2022-08-05 08:22:38
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-05 15:11:06
 * @Description: 请填写简介
 */
import { canvasDrag } from '@components/canvasDrag'
import LeftCanvas from '@components/LeftCanvas'
import { nodeDrag } from '@components/nodeDrag'
import RightCanvas from '@components/RightCanvas'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  useEffect(() => {
    nodeDrag('left')
    nodeDrag('right')
    canvasDrag()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles['flex-container']}>
        <LeftCanvas />
        <RightCanvas />
      </main>
    </div>
  )
}

export default Home
