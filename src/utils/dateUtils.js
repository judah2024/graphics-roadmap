// 날짜 형식화 함수
export const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };
  
  // 날짜 비교 함수
  export const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  // 날짜를 Google Calendar 형식으로 변환
  export const formatDateForGoogleCalendar = (dateString) => {
    // "4/23" 형식을 "2025-04-23" 형식으로 변환
    const [month, day] = dateString.split('/');
    return `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };
  
  // 다가오는 과제 필터링 (오늘로부터 7일 이내)
  export const getUpcomingTasks = (phases) => {
    const tasks = [];
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    phases.forEach(phase => {
      phase.weeks.forEach(week => {
        // 소 과제 마감일 체크
        if (week.smallTask) {
          const taskDate = getDateFromString(week.smallTask.deadline, 2025);
          if (taskDate >= today && taskDate <= nextWeek) {
            tasks.push({
              type: 'small',
              title: week.smallTask.title,
              deadline: week.smallTask.deadline,
              weekTitle: week.title,
              phaseTitle: phase.title
            });
          }
        }
        
        // 주간 과제 마감일 체크
        if (week.weeklyTask) {
          const taskDate = getDateFromString(week.weeklyTask.deadline, 2025);
          if (taskDate >= today && taskDate <= nextWeek) {
            tasks.push({
              type: 'weekly',
              title: week.weeklyTask.title,
              deadline: week.weeklyTask.deadline,
              weekTitle: week.title,
              phaseTitle: phase.title
            });
          }
        }
      });
      
      // 월간 프로젝트 마감일 체크
      if (phase.monthlyProject) {
        const taskDate = getDateFromString(phase.monthlyProject.deadline, 2025);
        if (taskDate >= today && taskDate <= nextWeek) {
          tasks.push({
            type: 'monthly',
            title: phase.monthlyProject.title,
            deadline: phase.monthlyProject.deadline,
            phaseTitle: phase.title
          });
        }
      }
    });
    
    return tasks;
  };
  
  // "4/23" 형식의 문자열을 Date 객체로 변환
  export const getDateFromString = (dateString, year) => {
    const [month, day] = dateString.split('/');
    return new Date(year, parseInt(month) - 1, parseInt(day));
  };

  // "4/23" 형식을 "2025-04-23" 형식으로 변환
export const formatDateForCalendar = (dateString) => {
  const [month, day] = dateString.split('/');
  return `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};