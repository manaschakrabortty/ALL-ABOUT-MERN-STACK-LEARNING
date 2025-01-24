import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState<{ date: Date; title: string }[]>([]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const addMeeting = (date: Date) => {
    const title = prompt('Enter meeting title:');
    if (title) {
      setMeetings([...meetings, { date, title }]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day, dayIdx) => {
            const dayMeetings = meetings.filter(
              (meeting) => format(meeting.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );

            return (
              <div
                key={day.toString()}
                className={`min-h-32 bg-white p-2 ${
                  isToday(day) ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isToday(day) ? 'font-semibold text-blue-600' : ''
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                  <button
                    onClick={() => addMeeting(day)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                <div className="mt-2">
                  {dayMeetings.map((meeting, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-blue-100 text-blue-700 p-1 rounded mb-1"
                    >
                      {meeting.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;