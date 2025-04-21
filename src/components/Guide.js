import React from 'react';
import { generateAllEventsICS } from '../utils/calendarUtils';

const Guide = ({ phases }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">사용 가이드</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">달력 보기</h3>
          <p>달력에서 파란색 테두리가 있는 날짜는 일정이 있는 날입니다. 날짜를 클릭하면 해당 일자의 일정이 표시됩니다.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">로드맵 보기</h3>
          <p>전체 로드맵을 확인하고 진행 상황을 체크할 수 있습니다. 주차 항목을 클릭하면 상세 내용이 펼쳐집니다.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">진행 상황 추적</h3>
          <p>각 항목 옆의 체크박스를 클릭하여 완료한 작업을 표시할 수 있습니다. 진행 상황은 브라우저에 저장되며 나중에 다시 방문할 때도 유지됩니다.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">학습 노트</h3>
          <p>각 주차별로 학습 노트를 작성할 수 있습니다. 마크다운 형식을 지원하므로 코드 블록, 링크 등을 포함할 수 있습니다.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">시간 추적</h3>
          <p>각 작업에 소요된 시간을 기록하고 추적할 수 있습니다. 이를 통해 효율적인 학습 계획을 세울 수 있습니다.</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">캘린더 내보내기</h3>
          <p className="mb-4">학습 일정을 ICS 파일로 내보내 캘린더 앱에 추가할 수 있습니다.</p>
          
          <button
            onClick={() => generateAllEventsICS(phases)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            전체 일정 내보내기 (.ics)
          </button>
          
          <div className="mt-4 bg-yellow-50 p-3 rounded">
            <h4 className="text-sm font-semibold text-yellow-800">캘린더 앱에서 ICS 파일 가져오는 방법:</h4>
            <ol className="mt-2 ml-5 text-sm text-yellow-800 list-decimal">
              <li>다운로드된 .ics 파일을 열거나</li>
              <li>캘린더 앱에서 '가져오기' 기능을 사용하여 다운로드한 파일을 선택하세요</li>
              <li>Google Calendar: '다른 캘린더' → '가져오기'</li>
              <li>Apple Calendar: '파일' → '가져오기'</li>
              <li>Outlook: '파일' → '가져오기 및 내보내기' → 'iCalendar 파일 가져오기'</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;