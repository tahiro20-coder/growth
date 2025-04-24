'use client'


import React, { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
    width: 400,
    facingMode: { exact: 'environment' },
}

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null)
  const [image, setImage] = useState(null)
  const [ready, setReady] = useState(false)

  const capture = useCallback(() => {
    if (!webcamRef.current) return

    const imageSrc = webcamRef.current.getScreenshot()
    if (imageSrc) {
      setImage(imageSrc)
      onCapture(imageSrc) // Call parent function with base64
    } else {
      alert('Webcam not ready. Please try again.')
    }
  }, [onCapture])

  return (
    <div className="flex flex-col items-center space-y-4">
      {!image ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={() => setReady(true)}
          />
          <button
            onClick={capture}
            disabled={!ready}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {ready ? 'Take Photo'}
          </button>
        </>
      ) : (
        <>
          <img src={image} alt="Captured" className="w-[400px] rounded" />
          <button
            onClick={() => setImage(null)}
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