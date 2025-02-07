/*
  # Initial Schema Setup for College Event Manager

  1. New Tables
    - events
      - Stores event details including title, description, capacity, etc.
    - registrations
      - Stores student registrations for events
    - reviews
      - Stores event reviews and ratings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  domain text NOT NULL CHECK (domain IN ('Technical', 'Cultural', 'Sports')),
  date timestamptz NOT NULL,
  location text NOT NULL,
  capacity integer NOT NULL DEFAULT 100,
  registered_count integer NOT NULL DEFAULT 0,
  image_url text,
  organizer text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id),
  student_id text NOT NULL,
  student_name text NOT NULL,
  email text NOT NULL,
  department text NOT NULL,
  year text NOT NULL,
  phone_number text NOT NULL,
  registration_date timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'attended')),
  qr_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id),
  user_id uuid REFERENCES auth.users(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies for events
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Events can be created by authorized users"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users WHERE auth.email() LIKE '%@college.edu'
  ));

-- Policies for registrations
CREATE POLICY "Users can view their own registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "Users can create their own registrations"
  ON registrations FOR INSERT
  TO authenticated
  WITH CHECK (email = auth.email());

-- Policies for reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_domain ON events(domain);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_student_id ON registrations(student_id);
CREATE INDEX IF NOT EXISTS idx_reviews_event_id ON reviews(event_id);