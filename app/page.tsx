'use client'

import WebcamCapture from '../components/WebcamCapture.js'
import { useState } from 'react'

export default function Home() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCapture = async (imageBase64: string) => {
    try {
      const res = await fetch('http://growth-azure.vercel.app/api/Classify', {
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

      {loading && <p className="mt-4 text-yellow-600">Predicting...</p>}

      {result && (
        <p className="mt-4 text-lg font-semibold text-green-600">
          Prediction: <span className="font-bold">{result}</span>
        </p>
      )}
    </main>
  )
}