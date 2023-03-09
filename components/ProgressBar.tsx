import React from 'react'

import { useEffect, useState } from 'react'

export function useReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    function updateScroll() {
      // 已经滚动的高度
      const currentScrollY = window.scrollY
      // 可以滚动的高度
      let scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setProgress(Number((currentScrollY / scrollHeight).toFixed(2)) * 100)
      }
    }
    // 添加全局滚动事件的监听
    window.addEventListener('scroll', updateScroll)

    // 移除监听
    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])
  return progress
}

export default function ProgressBar() {
  const progress = useReadingProgress()
  return (
    <div
      style={{
        transform: `translateX(${progress - 100}%)`,
      }}
      className="progressBar fixed left-0 h-0.5 w-full 
      bg-gradient-to-r from-pink-500 via-pink-300 to-pink-500
      dark:bg-gradient-to-r dark:from-indigo-600 dark:via-pink-500 dark:to-indigo-600 
      backdrop-blur-3xl transition-transform duration-150 z-[100]"
    ></div>
  )
}