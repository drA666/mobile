const isLessThen = (max: number) => (x: number): boolean => x >= 0 && x <= max;

export default class TimeAR {
  hours: number;
  minutes: number;
  seconds: number;

  constructor() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  static FromValues(hours: number, minutes: number, seconds: number): TimeAR {
    const t = new TimeAR();
    if (!isLessThen(23)(hours)) {
      throw new RangeError("Hours must be between 0 and 23");
    }
    const isLessThen59 = isLessThen(59);
    if (!isLessThen59(minutes)) {
      throw new RangeError("Minutes must be between 0 and 59");
    }
    if (!isLessThen59(seconds)) {
      throw new RangeError("Seconds must be between 0 and 59");
    }

    t.hours = hours;
    t.minutes = minutes;
    t.seconds = seconds;

    return t;
  }

  static FromDate(date: Date): TimeAR {
    const t = new TimeAR();

    t.hours = date.getHours();
    t.minutes = date.getMinutes();
    t.seconds = date.getSeconds();

    return t;
  }

  toString(): string {
    return `${this.hours % 12 || 12}:${this.minutes}:${this.seconds}:${
      this.hours < 12 || this.hours === 24 ? "AM" : "PM"
    }`;
  }

  private toSec(): number {
    return this.hours * 3600 + this.minutes * 60 + this.seconds;
  }

  add(time: TimeAR): TimeAR {
    const newTime = this.toSec() + time.toSec();

    const hours = ~~(newTime / 3600) % 24;
    const minutes = ~~(newTime / 60) % 60;
    const seconds = newTime % 60;

    return TimeAR.FromValues(hours, minutes, seconds);
  }

  subtract(time: TimeAR): TimeAR {
    let newTime = this.toSec() - time.toSec();
    newTime = newTime > 0 ? newTime : 86400 + newTime;

    const hours = ~~(newTime / 3600) % 24;
    const minutes = ~~(newTime / 60) % 60;
    const seconds = newTime % 60;

    return TimeAR.FromValues(hours, minutes, seconds);
  }

  static add(time1: TimeAR, time2: TimeAR): TimeAR {
    return time1.add(time2);
  }

  static subtract(time1: TimeAR, time2: TimeAR): TimeAR {
    return time1.subtract(time2);
  }
}
