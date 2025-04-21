const learningData = {
    phases: [
      {
        id: 1,
        title: "수학적 기초 강화",
        period: "4월 21일 - 5월 18일",
        weeks: [
          {
            id: 1,
            title: "벡터와 그래픽스 기초",
            period: "4/21-4/27",
            primaryBook: "M3DGP Ch.1-2",
            secondaryBook: "EM Ch.1-2",
            smallTask: { title: "부동소수점 정밀도 실험", deadline: "4/23" },
            weeklyTask: { title: "벡터 연산 라이브러리", deadline: "4/27" }
          },
          {
            id: 2,
            title: "행렬과 선형 변환",
            period: "4/28-5/4",
            primaryBook: "M3DGP Ch.3",
            secondaryBook: "EM Ch.3",
            smallTask: { title: "행렬 연산 성능 비교", deadline: "4/30" },
            weeklyTask: { title: "선형 시스템 솔버", deadline: "5/4" }
          },
          // 나머지 주차 데이터는 이전에 제공된 데이터 사용
        ],
        monthlyProject: {
          title: "수학 기반 변환 라이브러리",
          deadline: "5/18",
          description: "벡터/행렬/쿼터니언을 모두 포함하는 최적화된 그래픽스 수학 라이브러리 개발"
        }
      },
      // 나머지 단계 데이터는 이전에 제공된 데이터 사용
    ]
  };
  
  export default learningData;