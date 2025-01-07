export type UserRole = 'admin' | 'speaker' | 'attendee';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar_url?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  speaker_id: string;
  max_attendees: number;
}

export interface Speaker {
  id: string;
  user_id: string;
  bio: string;
  expertise: string[];
  sessions: string[];
}

export interface Registration {
  id: string;
  event_id: string;
  user_id: string;
  status: 'confirmed' | 'waitlist' | 'cancelled';
  created_at: string;
}

export interface Question {
  id: string;
  event_id: string;
  user_id: string;
  content: string;
  upvotes: number;
  status: 'pending' | 'answered';
  created_at: string;
}