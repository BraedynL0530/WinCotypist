import json
json_string= '''
{"students":[{"name":"Rishaan","Age":45,"Grade":10},{"gender":"male","REligion":"Atheist"}]}
'''

data=json.loads(json_string)
print(data)
def weather_now(x):
    if x>=20:
        print("It is cold today")
    else:
         print("It is hot today")

