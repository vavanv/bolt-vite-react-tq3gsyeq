import { Event, Speaker, Question } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Keynote: Future of Tech',
    description: 'Join us for an inspiring keynote about the future of technology and its impact on society.',
    start_time: '2024-03-15T09:00:00Z',
    end_time: '2024-03-15T10:30:00Z',
    speaker_id: '1',
    max_attendees: 500
  },
  {
    id: '2',
    title: 'Web Development Trends 2024',
    description: 'Explore the latest trends in web development, from new frameworks to best practices.',
    start_time: '2024-03-15T11:00:00Z',
    end_time: '2024-03-15T12:30:00Z',
    speaker_id: '2',
    max_attendees: 200
  },
  {
    id: '3',
    title: 'AI in Enterprise',
    description: 'Learn how AI is transforming enterprise software and business processes.',
    start_time: '2024-03-15T14:00:00Z',
    end_time: '2024-03-15T15:30:00Z',
    speaker_id: '3',
    max_attendees: 300
  }
];

export const mockSpeakers: Speaker[] = [
  {
    id: '1',
    user_id: '1',
    bio: 'Tech visionary with 20 years of experience in Silicon Valley',
    expertise: ['AI', 'Technology Strategy', 'Innovation'],
    sessions: ['1']
  },
  {
    id: '2',
    user_id: '2',
    bio: 'Lead Developer at Major Tech Company, Open Source Contributor',
    expertise: ['Web Development', 'JavaScript', 'React'],
    sessions: ['2']
  },
  {
    id: '3',
    user_id: '3',
    bio: 'AI Researcher and Enterprise Software Architect',
    expertise: ['Artificial Intelligence', 'Enterprise Software', 'Cloud Computing'],
    sessions: ['3']
  }
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    event_id: '1',
    user_id: '4',
    content: 'How do you see AI impacting job markets in the next 5 years?',
    upvotes: 15,
    status: 'pending',
    created_at: '2024-03-15T09:15:00Z'
  },
  {
    id: '2',
    event_id: '1',
    user_id: '5',
    content: 'What are your thoughts on quantum computing?',
    upvotes: 10,
    status: 'answered',
    created_at: '2024-03-15T09:20:00Z'
  }
];