import { useState, useEffect } from 'react';
import { formatDateForGoogleCalendar } from '../utils/dateUtils';

// Google Calendar API 설정
const API_KEY = 'YOUR_GOOGLE_API_KEY'; // 실제 배포 시 환경 변수로 관리 필요
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // 실제 배포 시 환경 변수로 관리 필요
const SCOPES = 'https://www.googleapis.com/auth/calendar';

const useGoogleCalendar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Google API 클라이언트 로드
  useEffect(() => {
    const loadGoogleAPI = () => {
      setIsLoading(true);
      
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('client:auth2', initClient);
      };
      script.onerror = () => {
        setError('Google API를 로드하는 데 실패했습니다.');
        setIsLoading(false);
      };
      
      document.body.appendChild(script);
    };
    
    const initClient = () => {
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
      }).then(() => {
        const authInstance = window.gapi.auth2.getAuthInstance();
        setIsAuthenticated(authInstance.isSignedIn.get());
        
        // 로그인 상태 변경 리스너
        authInstance.isSignedIn.listen((isSignedIn) => {
          setIsAuthenticated(isSignedIn);
        });
        
        setIsLoading(false);
      }).catch(err => {
        setError(`Google 클라이언트 초기화 오류: ${err.message}`);
        setIsLoading(false);
      });
    };
    
    loadGoogleAPI();
  }, []);
  
  // Google 로그인
  const signIn = () => {
    if (window.gapi && window.gapi.auth2) {
      window.gapi.auth2.getAuthInstance().signIn();
    }
  };
  
  // Google 로그아웃
  const signOut = () => {
    if (window.gapi && window.gapi.auth2) {
      window.gapi.auth2.getAuthInstance().signOut();
    }
  };
  
  // 캘린더에 일정 추가
  const addEventToCalendar = async (task) => {
    if (!isAuthenticated) {
      setError('Google Calendar에 접근하려면 로그인이 필요합니다.');
      return false;
    }
    
    try {
      const startDate = formatDateForGoogleCalendar(task.deadline);
      
      const event = {
        'summary': `[${task.type === 'small' ? '소 과제' : task.type === 'weekly' ? '주간 과제' : '월간 프로젝트'}] ${task.title}`,
        'description': `${task.phaseTitle} - ${task.weekTitle || ''}`,
        'start': {
          'date': startDate,
        },
        'end': {
          'date': startDate,
        },
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'popup', 'minutes': 24 * 60}, // 하루 전
            {'method': 'popup', 'minutes': 60} // 1시간 전
          ]
        }
      };
      
      const request = window.gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });
      
      const response = await request.execute();
      return response;
      
    } catch (err) {
      setError(`일정 추가 오류: ${err.message}`);
      return false;
    }
  };
  
  // 모든 일정을 Google Calendar에 추가
  const syncAllTasks = async (phases) => {
    if (!isAuthenticated) {
      setError('Google Calendar에 접근하려면 로그인이 필요합니다.');
      return false;
    }
    
    setIsLoading(true);
    
    try {
      const tasks = [];
      
      // 모든 과제 수집
      phases.forEach(phase => {
        phase.weeks.forEach(week => {
          if (week.smallTask) {
            tasks.push({
              type: 'small',
              title: week.smallTask.title,
              deadline: week.smallTask.deadline,
              weekTitle: week.title,
              phaseTitle: phase.title
            });
          }
          
          if (week.weeklyTask) {
            tasks.push({
              type: 'weekly',
              title: week.weeklyTask.title,
              deadline: week.weeklyTask.deadline,
              weekTitle: week.title,
              phaseTitle: phase.title
            });
          }
        });
        
        if (phase.monthlyProject) {
          tasks.push({
            type: 'monthly',
            title: phase.monthlyProject.title,
            deadline: phase.monthlyProject.deadline,
            phaseTitle: phase.title
          });
        }
      });
      
      // 일정 추가
      const results = [];
      for (const task of tasks) {
        const result = await addEventToCalendar(task);
        results.push(result);
      }
      
      setIsLoading(false);
      return results;
      
    } catch (err) {
      setError(`일정 동기화 오류: ${err.message}`);
      setIsLoading(false);
      return false;
    }
  };
  
  return { 
    isAuthenticated, 
    isLoading, 
    error, 
    signIn, 
    signOut, 
    addEventToCalendar,
    syncAllTasks
  };
};

export default useGoogleCalendar;