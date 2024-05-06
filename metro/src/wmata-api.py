import requests
from flask import Flask, jsonify

def GET_court_house_predictions_all():
    url = "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/K01"
    payload = {}
    headers = {
    'api_key' : 'e13626d03d8e4c03ac07f95541b3091b'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    return response.json()["Trains"]


def GET_court_house_predictions_downtown():
    court_house_all = GET_court_house_predictions_all()


print(GET_court_house_predictions_all())