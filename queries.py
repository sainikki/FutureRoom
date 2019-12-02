
from events import get_collection
from pymongo import MongoClient
import os

# db_user = os.environ.get('DB_USER')
# db_password = os.environ.get('DB_PASS')

db_user = 'capstone'
db_password = 'thisiscapstone'

client = MongoClient(
    "mongodb+srv://" + str(db_user) + ":" + str(db_password) + "@cluster0-xutue.mongodb.net/test?retryWrites=true&w=majority")
room_collection = get_collection(client, 'conference_db', 'room')
event_collection = get_collection(client, 'conference_db', 'event')
occupied_dates = event_collection.distinct('start_date')
rooms = room_collection.distinct('name')
events = event_collection.distinct('summary')
capacities = room_collection.distinct('capacity')
client.close()


def get_item(collection, item, item_column, target_column, find_method=0):
    if find_method == 0:
        result = collection.find_one({item_column: item})
        return result.get(target_column)
    elif find_method == 1:
        results = []
        for result in collection.find({item_column: item}):
            results.append(result.get(target_column))
        return results


def get_room_interval(ids):
    results = []
    for id in ids:
        start_time = get_item(event_collection, id, '_id', 'start_time',
                              find_method=0)
        end_time = get_item(event_collection, id, '_id', 'end_time',
                            find_method=0)
        room = get_item(event_collection, id, '_id', 'location',
                        find_method=0)
        results.append([start_time, end_time, room])
    return results


def is_conflict(interval, start_time, end_time, room):
    if interval[2] == room:
        if interval[0] <= start_time <= interval[1] or \
            interval[0] <= end_time <= interval[1] or \
                start_time <= interval[0] <= end_time:
            return True
        else:
            return False
    else:
        return False


def recommend_another(interval, start_time, end_time, no_attendees,  all_rooms):
    available_rooms = []
    for room in all_rooms:
        if not is_conflict(interval, start_time, end_time, room):
            capacity = get_item(room_collection, room, 'name', 'capacity',
                                find_method=0)
            if capacity >= no_attendees:
                result = (room, capacity)
                available_rooms.append(result)
    available_rooms = sorted(available_rooms, key=lambda x: x[1])
    results = []
    for room, capacity in available_rooms:
        results.append({'room': room, 'capacity': capacity})
    return (results)


def is_smallest(no_attendees):
    available_rooms = []
    for capacity in capacities:
        if no_attendees <= capacity:
            room = get_item(room_collection, capacity, 'capacity', 'name',
                            find_method=0)
            result = (room, capacity)
            available_rooms.append(result)
    available_rooms = sorted(available_rooms, key=lambda x: x[1])
    results = []
    for room, capacity in available_rooms:
        results.append({'room': room, 'capacity': capacity})
    return (results)


def validate_date(original_date):
    date = original_date
    date = date.split('-')
    month = date[1]
    day = date[2]
    if len(month) < 2:
        month = str(0)+(month)
    if len(day) < 2:
        day = str(0)+(day)
        return date[0] + '-' + month + '-' + day
    else:
        return original_date


def is_available(date, start_time, end_time, room, no_attendees):
    date = validate_date(date)
    no_attendees = int(no_attendees)
    results = {}
    if no_attendees > 30:
        text = 'The capacity of the largest meeting room is 30.'
        recommendation = None
    else:
        if date not in occupied_dates:
            text = 'The room is available at the requested time.'
            recommendation = is_smallest(no_attendees)
        else:
            ids = get_item(event_collection, date, 'start_date', '_id',
                           find_method=1)
            occupied_intervals = get_room_interval(ids)
            for interval in occupied_intervals:
                if is_conflict(interval, start_time, end_time, room):
                    text = 'There is a conflict with an existing meeting at {}-{} - {}.'.format(
                        interval[0], interval[1], interval[2])
                    recommendation = recommend_another(
                        interval, start_time, end_time, no_attendees, rooms)
                    break
                else:
                    text = 'The room is available at the requested time.'
                    recommendation = is_smallest(no_attendees)
    results['text'] = text
    results['recommendation'] = recommendation
    return (results)


# is_available('2019-10-09', '14:00', '15:00', 'Room B', 1)
# is_available('2019-10-09', '12:01', '13:59', 'Room C', 1)
# is_available('2019-10-29', '16:00', '17:00', 'Room B', 1)
# is_available('2019-10-05', '16:00', '17:00', 'Room A', 1)
# is_available('2019-10-09', '14:00', '15:00', 'Room C', 10)
# is_available('2019-10-09', '14:00', '15:00', 'Room D', 15)
# print(is_available("2019-11-8", "09:00", "09:03", "Room A", "1"))
