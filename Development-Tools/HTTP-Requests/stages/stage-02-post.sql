UPDATE QuoteRequests q
JOIN Users u ON q.userId = u.id
SET q.createdAt = '2024-11-30 10:00:00'
WHERE u.username = 'isabella' OR u.username = 'jacob';