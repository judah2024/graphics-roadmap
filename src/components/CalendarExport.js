import React from 'react';
import { generateAllEventsICS } from '../utils/calendarUtils';

const CalendarExport = ({ phases }) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-2">캘린더 내보내기</h3>
      <p className="mb-4">학습 일정을 캘린더 앱에 추가하여 알림을 받을 수 있습니다.</p>
      
      <button
        onClick={() => generateAllEventsICS(phases)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        전체 일정 내보내기 (.ics)
      </button>
      
      <div className="mt-2 text-sm text-gray-600">
        <p>다운로드된 .ics 파일을 Google Calendar, Apple Calendar, Outlook 등 원하는 캘린더 앱에서 가져오기할 수 있습니다.</p>
      </div>
    </div>
  );
};

export default CalendarExport;