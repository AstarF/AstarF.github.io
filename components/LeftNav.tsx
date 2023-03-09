import * as React from 'react'
import { useRef, useEffect, useState } from 'react'

import Table_of_Contents from './TOC'

// let savestatus = false;

const LeftNav = ({ ids }) => {


  return (
    <div>
      <Table_of_Contents ids={ids} />
    </div>
  )
}
export default LeftNav