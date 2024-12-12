const travelListMock = {
  upcomming: [
    {
      travelId: 13,
      isDomestic: false,
      travelName: '부여로 떠나는 다함께 시골투어',
      travelLocation: '충남 부여',
      maxParticipant: 6,
      currentParticipant: 1,
      startDate: '12/03',
      image: '/test/travel/test1.jpg',
    },
    {
      travelId: 14,
      isDomestic: true,
      travelName: '도쿄에서 즐기는 미식여행',
      travelLocation: '도쿄시',
      maxParticipant: 12,
      currentParticipant: 11,
      startDate: '12/06',
      image: '/test/travel/test2.jpg',
    },
    {
      travelId: 15,
      isDomestic: false,
      travelName:
        '제주 한라산 등반 후 미식 여행. 주로 한식&인스타 카페 방문 예정. 이후 일정 미정. 채팅으로 일정 정하기 가능!',
      travelLocation: '제주',
      maxParticipant: 6,
      currentParticipant: 5,
      startDate: '12/03',
      image: '/test/travel/test3.jpg',
    },
    {
      travelId: 16,
      isDomestic: true,
      travelName: '도쿄에서 즐기는 미식여행',
      travelLocation: '도쿄시',
      maxParticipant: 12,
      currentParticipant: 12,
      startDate: '12/06',
      image: '/test/travel/test4.jpg',
    },
  ],

  pastTravel: [
    {
      travelId: 17,
      isDomestic: false,
      travelName: '부여로 떠나는 다함께 시골투어',
      travelLocation: '충남 부여',
      maxParticipant: 6,
      currentParticipant: 1,
      startDate: '12/03',
      image: '/test/travel/test5.jpg',
    },
    {
      travelId: 16,
      isDomestic: true,
      travelName: '도쿄에서 즐기는 미식여행',
      travelLocation: '도쿄시',
      maxParticipant: 12,
      currentParticipant: 12,
      startDate: '12/06',
      image: '/test/travel/test1.jpg',
    },
  ],

  checkedTravel: [
    {
      travelId: 16,
      isDomestic: true,
      travelName: '도쿄에서 즐기는 미식여행',
      travelLocation: '도쿄시',
      maxParticipant: 12,
      currentParticipant: 12,
      startDate: '12/06',
      image: '/test/travel/test2.jpg',
    },
  ],

  mySelfTravel: [
    {
      travelId: 17,
      isDomestic: false,
      travelName: '부여로 떠나는 다함께 시골투어',
      travelLocation: '충남 부여',
      maxParticipant: 6,
      currentParticipant: 1,
      startDate: '12/03',
      image: '/test/travel/test4.jpg',
    },
  ],
};

export default travelListMock;
