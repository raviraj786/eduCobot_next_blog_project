import React from 'react'

export default function Loader() {
  return (
     <div className="w-full h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-700"></div>
   </div>
  )
}
