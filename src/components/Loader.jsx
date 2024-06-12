import React from 'react'
import { Bars } from 'react-loader-spinner'

function Loader() {
  return (
  <div id="root">
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
      <Bars
        height="80"
        width="80"
        color="#0000ff"
        ariaLabel="bars-loading"
        wrapp erStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  </div>
  )
}

export default Loader