export interface User {
  userId: number;
  email: string;
  nickname: string;
  profileImage: string;
  description: string;
}

export interface PopularUser
  extends Pick<User, 'userId' | 'nickname' | 'profileImage'> {
  openTravelCount: number;
  reviewCount: number;
  hashTags: string;
}
