'use client'

import WebcamCapture from '../components/WebcamCapture.js'
import { useState } from 'react'

export default function Home() {
  const [result, setResult] = useState(null)

  const handleCapture = async (imageBase64: string) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageBase64 }),
      })

      const result = await res.json()
      console.log('Prediction:', result)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <main className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Webcam Classifier</h1>
      <WebcamCapture onCapture={handleCapture} />
      {result && (
        <p className="mt-4 text-lg font-semibold">
          Prediction: <span className="text-blue-600">{result}</span>
        </p>
      )}
    </main>
  )
}