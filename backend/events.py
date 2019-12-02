from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import datetime
from pymongo import MongoClient

# db_user = os.environ.get('DB_USER')
# db_password = os.environ.get('DB_PASS')

db_user = 'capstone'
db_password = 'thisiscapstone'

# If modifying these scopes, delete the file token.pickle.
# SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
SCOPES = ['https://www.googleapis.com/auth/calendar']


def connect_to_api():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('calendar', 'v3', credentials=creds)
    return service


def get_event(service):
    # Call the Calendar API
    now = datetime.datetime.utcnow().isoformat() + 'Z'  \
        # 'Z' indicates UTC time
    # print('Getting the upcoming 10 events')
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                          maxResults=10, singleEvents=True,
                                          orderBy='startTime').execute()
    events = events_result.get('items', [])

    lst = []
    for i in range(len(events)):
        if events[i]['status'] == 'confirmed':
            try:
                dict = {}
                dict['location'] = events[i]['location']
                dict['summary'] = events[i]['summary']
                dict['start_time'] = events[i]['start']['dateTime'][-14:-9]
                dict['end_time'] = events[i]['end']['dateTime'][-14:-9]
                dict['start_date'] = events[i]['start']['dateTime'][:10]
                dict['end_date'] = events[i]['end']['dateTime'][:10]
                dict['startdate'] = events[i]['start']['dateTime']
                dict['enddate'] = events[i]['end']['dateTime']
                lst.append(dict)
            except KeyError:
                pass
        else:
            pass
    return lst


# def insert_event(service, event):
#     service.events().insert(calendarId='primary', body=event).execute()
#
#
# event = {
#     'summary': 'Test Event 04',
#     'location': 'Room D',
#     'description': 'Conference Room of the Future Event',
#     'start': {
#         'dateTime': '2019-12-06T13:00:00-04:00',
#     },
#     'end': {
#         'dateTime': '2019-12-06T14:00:00-04:00',
#     },
# }
#
# insert_event(connect_to_api(), event)


events = get_event(connect_to_api())

# save the date, time and location of events
# extracted from Google calendar to the database


def get_collection(client, database_name, collection_name):
    db = client[database_name]
    collection = db[collection_name]
    return collection


client = MongoClient(
    "mongodb+srv://" + str(db_user) + ":" + str(db_password) + "@cluster0-xutue.mongodb.net/test?retryWrites=true&w=majority")

collection = get_collection(client, 'conference_db', 'event')
summaries = collection.distinct('summary')

# mycol.drop()

for event in events:
    if len(event) > 0:
        try:
            if event['summary'] not in summaries:
                collection.insert_one(event)
        except IndexError:
            pass
client.close()
