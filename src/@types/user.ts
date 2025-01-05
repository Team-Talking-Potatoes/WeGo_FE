export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string;
  contact: string;
  birthDate: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  SaveList: [];
  LikesList: [];
  ParticipationList: [];
}

export interface UserList {
  userId: number;
  profileImage: string;
  nickName: string;
  openTravelCount: number;
  reviewCount: number;
  hashTags: string;
}

export interface MyPageProfile {
  userId: number;
  email: string;
  nickname: string;
  image: string;
  description: string;
}
