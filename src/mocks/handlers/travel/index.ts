import { createTravel } from './createTravel';
import { travelDetail } from './travelDetail';
import { travelList } from './travelList';
import { travelListInfinity } from './travelListInfinity';
import { popularTravel } from './popularTravel';
import { myPageTravel } from './mypage';

export const travel = [
  createTravel,
  travelList,
  travelDetail,
  travelListInfinity,
  popularTravel,
  ...myPageTravel,
];
