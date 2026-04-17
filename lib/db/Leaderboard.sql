select user_id, wpm, accuracy, language, mode, duration, created_at
from RESULTS
where language = ? and mode = ?
order by wpm desc, accuracy desc
limit 10;