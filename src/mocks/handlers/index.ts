import template from './template';
import login from './login';
import signup from './signup';
import popularTravel from './travel/popularTravel';

export const handlers = [...template, login, ...signup, ...popularTravel];
