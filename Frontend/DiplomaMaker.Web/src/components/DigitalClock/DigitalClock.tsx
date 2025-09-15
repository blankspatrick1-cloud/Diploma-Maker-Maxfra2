import React, { useState, useEffect } from 'react';
import './DigitalClock.css';

interface TimeZoneData {
  label: string;
  timeZone: string;
}

export const DigitalClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const timeZones: TimeZoneData[] = [
    { label: 'UTC', timeZone: 'UTC' },
    { label: 'New York', timeZone: 'America/New_York' },
    { label: 'Tokyo', timeZone: 'Asia/Tokyo' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeZone: string): string => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    return formatter.format(currentTime);
  };

  const formatDate = (timeZone: string): string => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return formatter.format(currentTime);
  };

  return (
    <div className="digital-clock">
      <div className="digital-clock__header">
        <h2 className="digital-clock__title">World Clock</h2>
      </div>
      <div className="digital-clock__zones">
        {timeZones.map((zone) => (
          <div key={zone.timeZone} className="digital-clock__zone">
            <div className="digital-clock__zone-label">{zone.label}</div>
            <div className="digital-clock__time">{formatTime(zone.timeZone)}</div>
            <div className="digital-clock__date">{formatDate(zone.timeZone)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};