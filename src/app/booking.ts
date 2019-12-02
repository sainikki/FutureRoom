export class Booking {
    constructor(
    public month: number,
    public day: number,
    public year: number,
    public start_hour: number,
    public start_minute: number,
    public startampm: string,
    public end_hour: number,
    public end_minute: number,
    public endampm: string,
    public attendees: number,
    public pref_room: string,

    ) {}

}
