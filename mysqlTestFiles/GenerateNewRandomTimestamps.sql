SET @MIN = '2022-01-01 00:00:00';
SET @MAX = '2022-02-07 00:00:00';

UPDATE sensorValues SET timestamp = TIMESTAMPADD(SECOND, FLOOR(RAND() * TIMESTAMPDIFF(SECOND, @MIN, @MAX)), @MIN) WHERE id;

-- test um zu sehen, ob ich es einffach so vergleichen kann
SELECT * FROM sensorValues WHERE timestamp >= "2022-01-23 12:23:04" and timestamp <= "2022-02-04 09:21:25";