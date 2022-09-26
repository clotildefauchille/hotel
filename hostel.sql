INSERT INTO `hotel`.`room`(`category`, `price`,`breakfastNumber`,`option`,`hostel_id`) VALUES("single",50,2,"tv",1);

INSERT INTO `hostel`(`name`, `adress`,`zipCode`,`totalRoomNumber`,`type`) VALUES("Hotel de la gare","35 rue lepic","75014",100,"4 stars");

SELECT * FROM user;
/* Selection des rooms */
SELECT * FROM room where id=2;

SELECT * FROM hostel;

SELECT * FROM hostel where name='hôtel Clea';

DELETE  from hostel where id=1014;

DELETE  from room;

TRUNCATE TABLE `user`;

SELECT * FROM hostel;

SELECT * FROM reservation_room;

SELECT * FROM reservation;

INSERT INTO reservation (start) VALUES (DATE_FORMAT('2022-05-07', "%Y-%m-%d"));

SELECT * FROM reservation where  DATE_FORMAT(start, "%Y-%m-%d")='2022-07-21' AND DATE_FORMAT(finished, "%Y-%m-%d")='2022-08-02';

SELECT * FROM reservation where NOT(('2022-07-21'>= DATE_FORMAT(start, "%Y-%m-%d") AND '2022-07-21' <= DATE_FORMAT(finished, "%Y-%m-%d")) OR ('2022-08-21'>=DATE_FORMAT(start, "%Y-%m-%d") AND '2022-08-21' <= DATE_FORMAT(finished, "%Y-%m-%d")) OR ('2022-07-21' <=DATE_FORMAT(start, "%Y-%m-%d") AND '2022-08-21'>DATE_FORMAT(finished, "%Y-%m-%d")));

SELECT * FROM reservation INNER JOIN reservation_room ON reservation_room.id_reservation=reservation.id INNER JOIN room ON reservation_room.id_room=room.id INNER JOIN hostel ON room.hostel_id=hostel.id where NOT(('2022-07-21'>= DATE_FORMAT(start, "%Y-%m-%d") AND '2022-07-21' <= DATE_FORMAT(finished, "%Y-%m-%d")) OR ('2022-08-21'>=DATE_FORMAT(start, "%Y-%m-%d") AND '2022-08-21' <= DATE_FORMAT(finished, "%Y-%m-%d")) OR ('2022-07-21' <=DATE_FORMAT(start, "%Y-%m-%d") AND '2022-08-21'>DATE_FORMAT(finished, "%Y-%m-%d")));

SELECT * FROM reservation_room WHERE id_reservation=3;

SELECT * FROM reservation INNER JOIN reservation_room ON reservation_room.id_reservation=reservation.id INNER JOIN room ON reservation_room.id_room=room.id INNER JOIN hostel ON room.hostel_id=hostel.id WHERE reservation.id=99;
SELECT * FROM reservation where id=99;

SELECT * FROM reservation;
SELECT DISTINCT id_reservation FROM reservation_room;

INSERT INTO reservation_room (id_reservation, id_room) 
 (SELECT id, (SELECT id FROM room ORDER BY RAND() LIMIT 1) FROM reservation WHERE id NOT IN (SELECT rr2.id_reservation FROM reservation_room AS rr2 ));

SELECT id FROM reservation WHERE id NOT IN (SELECT rr2.id_reservation FROM reservation_room AS rr2);

SELECT * FROM customer;

DELETE reservation FROM reservation INNER JOIN reservation_room ON reservation_room.id_reservation=2 WHERE id = 2;

SELECT count(*) FROM customer;

SET SQL_SAFE_UPDATES =0;

ALTER TABLE `reservation` AUTO_INCREMENT=1;


DELETE FROM reservation;

CREATE USER 'hotel'@'localhost' IDENTIFIED WITH mysql_native_password BY 'hotel';

GRANT ALL PRIVILEGES ON *.* to 'hotel'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;

UPDATE reservation SET start=finished, finished=start WHERE finished<start;

UPDATE reservation SET finished=DATE_ADD(start, INTERVAL 2 DAY) WHERE finished=start;

UPDATE reservation SET finished=DATE_ADD(start, INTERVAL ROUND(total/59) DAY);


