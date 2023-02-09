import json

with open('ppgdata.json') as json_data:
    for entry in json_data:
        print(entry)