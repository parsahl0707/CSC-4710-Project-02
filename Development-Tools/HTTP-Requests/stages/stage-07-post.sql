UPDATE BillRequests b
JOIN Users u ON b.userId = u.id
SET b.createdAt = '2024-10-30 10:00:00'
WHERE u.username = 'isabella' OR u.username = 'jacob';