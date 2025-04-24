'use client'

import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 400,
  facingMode: 'user', // or 'environment' for back camera on mobile
}

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null)
  const [image, setImage] = useState(null)

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot()
    setImage(screenshot)
    onCapture(screenshot)
  }

  const reset = () => setImage(null)

  return (
    <div className="flex flex-col items-center space-y-4">
      {!image ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button
            onClick={capture}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Take Photo
          </button>
        </>
      ) : (
        <>
          <img src={image} alt="Captured" className="w-[400px] rounded" />
          <button
            onClick={reset}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Retake
          </button>
        </>
      )}
    </div>
  )
}

export default WebcamCapture