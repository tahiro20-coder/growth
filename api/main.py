from flask_restful import Api, Resource, reqparse
from flask import Flask, send_from_directory,current_app,jsonify,request
import requests as req
import numpy as np
import json
from PIL import Image  
from io import BytesIO
import base64
import os
from dotenv import load_dotenv
# from google import genai
# import google.generativeai as genai



# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

from random import randrange

def upload_file(file, url="http://localhost:8000/classify"):
    with BytesIO() as buf:
      file.save(buf, 'jpeg')
      image_bytes = buf.getvalue()

      files = {"image": image_bytes}
      response = req.post(url, files=files)

    return response.json()

class Classify(Resource):
    def get(self):
        return {
        'message': "recycle Get"
        }

    def post(self):
        print(self)
        
        res =  request.json["files"]

        img = Image.open(BytesIO(base64.b64decode(res))).convert("RGB")

        
        url = "https://tahiro20-growth.hf.space/classify"

        try:
            response = upload_file(img,url)
            prediction = response["prediction"]
        except:
            print("error")
            prediction = randrange(12)
        return {"output":prediction}



