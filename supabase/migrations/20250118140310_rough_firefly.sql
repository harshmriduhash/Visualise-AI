/*
  # Create dreams table and storage

  1. New Tables
    - `dreams`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `description` (text)
      - `mood` (text)
      - `image_url` (text)
      - `audio_url` (text)
      - `story` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `dreams` table
    - Add policies for authenticated users to:
      - Read their own dreams
      - Create new dreams
*/

CREATE TABLE IF NOT EXISTS dreams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  description text NOT NULL,
  mood text NOT NULL,
  image_url text,
  audio_url text,
  story text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own dreams"
  ON dreams
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create dreams"
  ON dreams
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);