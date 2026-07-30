import {Resend} from 'resend';
import { ENV } from './env.js';
// import 'dotenv/config';

// // import dotenv from 'dotenv';
// // dotenv.config();                   

// export const resendClient = new Resend(process.env.RESEND_API_KEY);
export const resendClient = new Resend(ENV.Resend_API_KEY);

export const sender = {
  email: ENV.EMAIL_FROM,
  name: ENV.EMAIL_FROM_NAME,
}