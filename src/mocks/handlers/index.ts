import { auth } from './auth';
import { review } from './review';
import { travel } from './travel';
import { user } from './user';

export const handlers = [...auth, ...review, ...travel, ...user];
