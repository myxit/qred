import React from "react"
import "./Layout.css"

export default function Layout({ children }: any) {
  return (
    <div 
      // style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }} 
      className="leaf-texture mx-auto my-0 max-w-lg px-5 py-4">
      {children}
    </div>
  )
}