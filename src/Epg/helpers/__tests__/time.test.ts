import { formatTime, isYesterday } from '../time';

describe('Time helpers', () => {
  it('should format program time', () => {
    const time = '2022-02-01 23:50:00';
    const timeFormatted = '2022-02-01T23:50:00';
    expect(formatTime(time)).toBe(timeFormatted);

    expect(formatTime(new Date(time))).toBe(timeFormatted);
    expect(formatTime(new Date(time).getTime())).toBe(timeFormatted);
    expect(formatTime(new Date(time).getTime())).not.toBe(
      new Date(timeFormatted).getTime()
    );

    expect(formatTime(time)).not.toBe('2022-02-01');
    expect(formatTime(time)).not.toBe('2022-02-01 23:50');
    expect(formatTime(time)).not.toBe('23:50:00');
  });

  it('should check if this is yesterday date', () => {
    const startDate = '2022-02-02 00:00:00';
    const date = '2022-02-01 23:50:00';
    expect(isYesterday(date, startDate)).toBe(true);
    expect(isYesterday(new Date(date), new Date(startDate))).toBe(true);
    expect(
      isYesterday(new Date(date).getTime(), new Date(startDate).getTime())
    ).toBe(true);

    expect(isYesterday(date, startDate)).not.toBe(false);
    expect(isYesterday(startDate, date)).not.toBe(true);
  });
});
