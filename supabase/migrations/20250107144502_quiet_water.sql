/*
  # Initial Conference Management System Schema

  1. Tables
    - users (handled by Supabase Auth)
    - profiles
      - Extends user information
      - Stores role and profile data
    - events
      - Conference events/sessions
      - Includes title, description, timing
    - speakers
      - Speaker profiles and details
    - registrations
      - Event registration tracking
    - questions
      - Q&A functionality
    - question_votes
      - Tracks question upvotes

  2. Security
    - RLS policies for each table
    - Role-based access control
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'speaker', 'attendee');
CREATE TYPE registration_status AS ENUM ('confirmed', 'waitlist', 'cancelled');
CREATE TYPE question_status AS ENUM ('pending', 'answered');

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role user_role NOT NULL DEFAULT 'attendee',
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  speaker_id UUID REFERENCES profiles(id),
  max_attendees INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Speakers table
CREATE TABLE speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  bio TEXT,
  expertise TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Registrations table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  status registration_status NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  status question_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Question votes table
CREATE TABLE question_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(question_id, user_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_votes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage events"
  ON events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Speakers policies
CREATE POLICY "Speaker profiles are viewable by everyone"
  ON speakers FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage speakers"
  ON speakers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Registrations policies
CREATE POLICY "Users can view own registrations"
  ON registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register themselves"
  ON registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own registrations"
  ON registrations FOR UPDATE
  USING (auth.uid() = user_id);

-- Questions policies
CREATE POLICY "Questions are viewable by everyone"
  ON questions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can ask questions"
  ON questions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own questions"
  ON questions FOR UPDATE
  USING (auth.uid() = user_id);

-- Question votes policies
CREATE POLICY "Question votes are viewable by everyone"
  ON question_votes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can vote"
  ON question_votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own votes"
  ON question_votes FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_registrations_event_user ON registrations(event_id, user_id);
CREATE INDEX idx_questions_event ON questions(event_id);
CREATE INDEX idx_question_votes_question ON question_votes(question_id);