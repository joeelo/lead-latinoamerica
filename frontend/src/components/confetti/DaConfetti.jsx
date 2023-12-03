import React, { useEffect,useRef, useState } from "react"
import Confetti from "react-confetti"

export default function DaConfetti() {
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const confetiRef = useRef(null)

  useEffect(() => {
    setHeight(window.innerHeight)
    setWidth(confetiRef.current.clientWidth)
  }, [])

  return (
    <div ref={confetiRef}>
      <Confetti numberOfPieces={150} width={width} height={height} initialVelocityY={3}/>
    </div>
  );
}