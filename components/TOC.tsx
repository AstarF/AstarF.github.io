import React from 'react'
import Link from 'next/link'

import useScrollSpy from '../lib/scollSpy'

/**
 * This offset is meant for the smooth scrolling and
 * Scrollspy to take into account the header height
 */
const OFFSET = 100

interface TableOfContentProps {
  ids: Array<{ value: string; url: string; depth: number }>
}

let saveids = null
const Table_of_Contents = ({ ids }: TableOfContentProps) => {
  if (ids.length > 0) saveids = ids
  else if (saveids && saveids.length > 0) ids = saveids
  let [currentActiveIndex] = useScrollSpy(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ids.map((item) => {
      return document.querySelector(`${item.url}`)!
    }),
    { offset: OFFSET }
  )

  function space(number){
    let str = ""
    for(let i=0;i<number;++i){
      str+="\u00A0\u00A0\u00A0"
    }
    return str;
  }

  if (ids.length > 0) {
    return (
      <div className="mt-8 table-of-contents">
        <ul>
          {ids.map((item, index) => {
            return (
              <Link href={`${item.url}`} key={item.value}>
                <span
                  className={
                    'text-primary-500 dark:text-primary-300 toc-a hover:text-pink-500 dark:hover:text-indigo-600  hover:font-bold text-left'
                  }
                // className={
                //   currentActiveIndex === index
                //     ? 'text-pink-500 dark:text-indigo-600 toc-a font-bold'
                //     : 'text-primary-600 dark:text-primary-300 toc-a hover:text-pink-500 dark:hover:text-indigo-600  hover:font-bold'
                // }
                >
                  <li key={item.url} className="py-0.5 text-sm">
                    {space(item.depth)+item.value}
                  </li>
                </span>
              </Link>
            )
          })}
        </ul>
      </div>
    )
  }
  return <></>
}

export default Table_of_Contents
