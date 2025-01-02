import { auth } from './auth';
import { review } from './review';
import { travel } from './travel';
import { user } from './user';
import { chat } from './chat';

export const handlers = [...auth, ...review, ...travel, ...user, ...chat];
