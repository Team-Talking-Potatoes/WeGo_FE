interface User {
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

export default User;