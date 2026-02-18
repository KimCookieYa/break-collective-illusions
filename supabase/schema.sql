-- Supabase SQL Schema for break-collective-illusions
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/YOUR_PROJECT/sql)

-- votes 테이블: 사용자 투표 저장
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  user_guess INTEGER NOT NULL CHECK (user_guess >= 0 AND user_guess <= 100),
  locale TEXT NOT NULL DEFAULT 'ko',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 같은 fingerprint로 같은 질문에 중복 투표 방지
  UNIQUE(question_id, fingerprint)
);

-- 집계용 인덱스
CREATE INDEX IF NOT EXISTS idx_votes_question_id ON votes(question_id);
CREATE INDEX IF NOT EXISTS idx_votes_fingerprint ON votes(fingerprint);

-- RLS (Row Level Security) 활성화
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- anon 사용자가 INSERT 가능
CREATE POLICY "Allow anonymous inserts" ON votes
  FOR INSERT WITH CHECK (true);

-- anon 사용자가 집계 조회 가능 (개별 fingerprint는 숨김)
CREATE POLICY "Allow anonymous select for aggregation" ON votes
  FOR SELECT USING (true);

-- 질문별 통계 조회 함수 (10명 이상일 때만 평균 반환)
CREATE OR REPLACE FUNCTION get_question_stats(q_id TEXT)
RETURNS JSON AS $$
DECLARE
  vote_count INTEGER;
  avg_guess NUMERIC;
BEGIN
  SELECT COUNT(*), AVG(user_guess)
  INTO vote_count, avg_guess
  FROM votes
  WHERE question_id = q_id;
  
  RETURN json_build_object(
    'questionId', q_id,
    'voteCount', vote_count,
    'averageGuess', CASE WHEN vote_count >= 10 THEN ROUND(avg_guess, 1) ELSE NULL END,
    'isVisible', vote_count >= 10
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 모든 질문 통계 조회 함수
CREATE OR REPLACE FUNCTION get_all_question_stats()
RETURNS JSON AS $$
BEGIN
  RETURN (
    SELECT json_agg(
      json_build_object(
        'questionId', question_id,
        'voteCount', cnt,
        'averageGuess', CASE WHEN cnt >= 10 THEN ROUND(avg_val, 1) ELSE NULL END,
        'isVisible', cnt >= 10
      )
    )
    FROM (
      SELECT question_id, COUNT(*) as cnt, AVG(user_guess) as avg_val
      FROM votes
      GROUP BY question_id
    ) stats
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
