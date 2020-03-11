-- Notizblock

----Ohne Skill
SELECT * FROM mitarbeiter
LEFT JOIN (SELECT m.id_mitarbeiter as id FROM mitarbeiter m
                INNER JOIN aufgabe_mitarbeiter am
                    ON m.id_mitarbeiter = am.mitarbeiter
                WHERE am.ab >= '20/04/01' AND am.ab <= '20/04/30' OR am.bis >= '20/04/01' AND am.bis <= '20/04/30') AS beschaftigt
ON mitarbeiter.id_mitarbeiter = beschaftigt.id
WHERE id is NULL


----Spring Boot
SELECT * FROM mitarbeiter
LEFT JOIN (SELECT m.id_mitarbeiter as id FROM mitarbeiter m
                INNER JOIN aufgabe_mitarbeiter am
                    ON m.id_mitarbeiter = am.mitarbeiter
                WHERE am.ab >= ?1 AND am.ab <= ?2 OR am.bis >= ?1 AND am.bis <= ?2) AS beschaftigt
ON mitarbeiter.id_mitarbeiter = beschaftigt.id
WHERE id is NULL




----in Anbetracht Skills
SELECT mit.* FROM mitarbeiter mit
LEFT JOIN (SELECT m.id_mitarbeiter as id FROM mitarbeiter m
                INNER JOIN aufgabe_mitarbeiter am
                    ON m.id_mitarbeiter = am.mitarbeiter
                WHERE am.ab >= '20/04/01' AND am.ab <= '20/04/30' OR am.bis >= '20/04/01' AND am.bis <= '20/04/30') AS beschaftigt
	ON mit.id_mitarbeiter = beschaftigt.id
INNER JOIN mitarbeiter_skill sk
	ON sk.mitarbeiters_id_mitarbeiter = mit.id_mitarbeiter 
WHERE beschaftigt.id is NULL
	AND sk.skill_id_skill = 5
