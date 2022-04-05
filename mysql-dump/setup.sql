DROP DATABASE IF EXISTS floweraufdauer;

CREATE DATABASE IF NOT EXISTS floweraufdauer;

-- for docker Database;
USE floweraufdauer;

-- For onlinedatabase
-- USE d038e858;


-- USERS
-- ENUM('admin', 'user', 'manager', 'verwalter', 'betreuer')  
CREATE TABLE IF NOT EXISTS users(  
        id int AUTO_INCREMENT PRIMARY KEY NOT NULL,  
        username varchar(255) NOT NULL UNIQUE,  
        firstname varchar(255) NULL,  
        lastname varchar(255) NULL,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        role varchar(255) NOT NULL, 
        authToken varchar(255) NULL  
    );

CREATE INDEX IF NOT EXISTS usersIndex ON users(username, lastname, firstname);


-- Passwörter mit bcrypt nodejs generiert das entschlüsselte Passwort für diese Benutzer ist "password"
-- INSERT IGNORE INTO users (id, username, password, email, role) values (1, 'admin', 'password', "admin@gmail.com", 'admin');
/* #region   */
INSERT IGNORE INTO users (id, username, firstname, lastname, password, role, email, authToken) values 
(2, 'oszi', 'Stefan', 'Ostojic', "$2b$10$mduoe4DF8LxNr4K6y/lsmO2BsmeM2yMolxQIgffJvpySRCsRmSNy6", 'admin', "oszi@gmail.com", null),
(3, 'klausi', 'Klaus', 'Musterman', "$2b$10$BYKsVvi1JVnMkI.Lmvc/XeriqNtCog2Qn9r8FwD.6VtNReZtFiY9y", 'user', "klausi@gmail.com", null),
(4, 'Matzi', 'Matthias', 'Schwenniger', "$2b$10$DxTsp/vdCILc6JSJ8QMlfOHiry1bUpVQl9lZ1Y5q8JBYCL8tRb7am", 'manager', "matzi@gmail.com", null),
(5, 'Lexi', 'Alexander', 'Tusch', "$2b$10$bTiyZLpRwn358.6u9fuqb.INMK9CdXO9XKy7Wxh8zE6T4WOms6BcG", 'admin', "lexi@gmail.com", null),
(6, 'Gamper', 'Michael', 'Gamper', "$2b$10$T5FJ1k/j3uvKxB5lPd9B1ehdtXOWDwdI7AMoEz0MS7qJlIR.DsRNK", 'betreuer', 'gamper@gmail.com', null);
INSERT IGNORE INTO users (id, username, firstname, lastname, email, password, role, authToken) values 
(7,"Ryan S. Lynn","Zena","French","sociis.natoque.penatibus@icloud.it","BVX51DRY8QY","gravida.","LPY3JKASsAKASiNKMASe57BJF2LA"),
(8,"Kermit Q. Dean","Whitney","Melendez","ipsum.dolor.sit@yahoo.us","VQY16SDK6OL","primis","TPV2JKASkAKASoNKMASI01HLA2HL"),
(9,"Macey Q. Valdez","Fay","Howell","maecenas.mi@icloud.de","UIB14ISJ0FX","lorem","WEM8JKASH6KASENKMASE04FLT2SM"),
(10,"Wynter L. Miles","Drake","Harris","commodo@outlook.us","HSG41THE4BY","mollis.","USU7JKASgBKASaNKMASE17EJZ3FX"),
(11,"Mira S. Figueroa","Brooke","Herman","iaculis.enim.sit@outlook.srb","NCD85GWB5RW","eu","UUS6JKASr8KASINKMASe97ZHR3PD"),
(12,"Althea F. Dorsey","Madison","Benjamin","sociis.natoque@aol.edu","SCT40GDP3CK","nec","EGW8JKASH4KASINKMASO63XNC7YU"),
(13,"Morgan U. Mullen","Madonna","Grimes","elit@aol.de","EZT76JFG7RI","eu","HQZ3JKASf9KASiNKMASO35ASK4BH"),
(14,"Noble C. Snider","Yoshi","Cabrera","montes@outlook.org","RXD79SHV2IR","ultrices.","GFV7JKASD2KASINKMASO58VSN4EV"),
(15,"Brock D. Brennan","Richard","Gonzales","nullam.enim.sed@aol.srb","ETH78LBK2LQ","vitae","DGX9JKASv4KASONKMASO83OYP4XK"),
(16,"Nomlanga L. Lott","Ivana","Bryant","dictum.eu@yahoo.srb","GHG31GWX2UJ","lectus","GEI7JKASdFKASaNKMASi77SPF0CC"),
(17,"May Y. Montgomery","Hoyt","Page","hendrerit@yahoo.couk","QMH41UAW6GH","blandit","NON5JKASQ8KASUNKMASO78OQE5QM"),
(18,"Emmanuel C. Castaneda","Robin","Mcintyre","feugiat.lorem@gmaiil.ca","UTE56JUX6OD","ornare","QZK2JKASK1KASANKMASe32HDU1MY"),
(19,"Nathaniel P. Serrano","Colorado","Stevens","odio@protonmail.us","TLI58LJQ6TY","et","MEL7JKASWDKASONKMASe06CJI2BA"),
(20,"Xena G. Bartlett","Mechelle","Dotson","ut.semper.pretium@google.de","DTC45WUH5GS","enim","TDL1JKASC2KASiNKMASi70LCC1EE"),
(21,"Danielle T. Conrad","Charde","Fitzgerald","feugiat.nec.diam@google.us","DOG15XTG8TV","metus","VZR3JKASj9KASONKMASE14LDS2LE"),
(22,"Arsenio U. Ward","Baker","Quinn","fermentum.arcu@yahoo.edu","VTO13FBV6ER","lorem","TUA5JKASsCKASeNKMASi28PSI4TH"),
(23,"Declan G. Stewart","Lareina","Snow","arcu@yahoo.it","LPH64NOY7EK","egestas","OXI4JKASX4KASuNKMASo33EBM2SY"),
(24,"Leandra U. Patrick","Ali","Willis","tellus.lorem.eu@hotmail.net","BCM75JRE5KL","augue","UTC6JKASX7KASUNKMASi32HFL3MR"),
(25,"Phyllis S. Mclean","Dai","Trujillo","ligula.nullam@hotmail.srb","IPT95RLJ4DS","ridiculus","PGI6JKASuFKASONKMASa56GCU5KY"),
(26,"Teegan D. Cabrera","Ulla","Simon","viverra.maecenas@icloud.it","GGF84WOI3HJ","Duis","UIV3JKASP8KASeNKMASo77RAZ7NY"),
(27,"Elliott P. Mcdowell","Stella","Stein","mauris@yahoo.org","KQO22MDJ2EZ","orci","DLK4JKASl8KASeNKMASe88XYT3IW"),
(28,"Noelle L. Gilliam","Hedwig","Estes","sagittis.duis@google.ca","IQX36UYT1EP","tempus","OYE6JKASQEKASUNKMASo57WDL8KB"),
(29,"Carla D. Griffith","Murphy","Ashley","erat.volutpat@icloud.net","JTX79FKC5JO","porttitor","XGQ3JKASRAKASaNKMASa23EXH9DH"),
(30,"Rebecca V. Duran","Bethany","Fowler","mi.aliquam@outlook.org","CBP15JRR6EM","cursus","OSP3JKASX8KASuNKMASI62OSQ1CM"),
(31,"Alea W. Harmon","Hamilton","Hensley","primis.in@hotmail.org","VBN66RVM3NO","ac","HNM7JKASr3KASUNKMASi35XRR6KH"),
(32,"Gregory D. Riggs","Denise","Robinson","neque.non@protonmail.us","XFV36MDG2JT","et","LPE9JKASQ8KASeNKMASi50KTD1UD"),
(33,"Brynne N. Wright","Maya","Mccormick","et@yahoo.us","FTN88RUO6ZX","tellus,","MDY2JKASt3KASoNKMASi17ZUH4NZ"),
(34,"Lacy S. Morrow","Brody","Padilla","eget.volutpat@yahoo.edu","GHB61WBS3GU","consectetuer","YPK7JKASL6KASeNKMASE53TMM0QY"),
(35,"Galvin R. Williamson","Florence","Nieves","vulputate.velit@aol.de","EKN13LHF1SY","eu","RXO6JKASdDKASiNKMASe84SRW9ML"),
(36,"Ezra N. Graves","Lenore","Mcgee","maecenas.libero@hotmail.org","YEY85ROS3UT","commodo","VGY8JKASO8KASUNKMASa75OCK6IY"),
(37,"Yvonne D. Preston","Paula","West","quam.quis@protonmail.srb","QUY03PLY6WY","Vivamus","HOU2JKASn1KASoNKMASE61JGM0HU"),
(38,"Rhea C. Compton","Morgan","Baker","eu.lacus.quisque@aol.at","MHB36HYY1JU","diam.","FVW3JKASO7KASENKMASA41TGK5FE"),
(39,"Mallory X. Mcfadden","Baxter","Sullivan","est.nunc.laoreet@aol.us","IEQ87KRQ7WE","felis.","GQQ9JKASy3KASoNKMASu35KWO3TQ"),
(40,"Olga R. Robbins","Deacon","Dunn","molestie.pharetra.nibh@hotmail.edu","YHO75EIQ8XT","Ut","NWG6JKASZ4KASeNKMASa74UVQ3HG"),
(41,"Halla L. Cunningham","Madison","Lopez","pede@icloud.com","IVV15CDL5LX","purus","DKW4JKASxBKASINKMASO91RDI6GH"),
(42,"Glenna T. Roth","Grant","Patel","malesuada.fames@gmaiil.com","HVX33FMJ3CG","tincidunt","ESI7JKASL6KASENKMASI65YPY8ID"),
(43,"Christine E. Wall","Sylvester","Molina","mollis.non@icloud.net","YII32YUP8ET","Vivamus","RLE1JKASlBKASUNKMASU85IKK0HD"),
(44,"Hope D. Carlson","Josiah","Perry","donec@gmaiil.edu","KBN53XOR6JG","interdum.","POY4JKASxDKASaNKMASU61BEE2OG"),
(45,"Hyacinth D. Wallace","Murphy","Kaufman","ligula.tortor@google.at","QIF43KUW1HR","arcu.","NDC9JKASv4KASONKMASE44OYX5UH"),
(46,"Vladimir J. Dillard","Charissa","Holden","pharetra.nam@protonmail.couk","ZAV43NUQ0LB","neque.","NLA2JKASJAKASINKMASu13IWY8NS"),
(47,"Aline D. Massey","Thor","Cash","adipiscing@google.at","XNL16XGK7VF","eget","LIR5JKASlEKASiNKMASU18BQC7HS"),
(48,"Constance I. Whitney","Margaret","Atkins","euismod.urna.nullam@icloud.ca","QMO25TVK4UF","imperdiet","CBP4JKASiAKASuNKMASe57CLL1JM"),
(49,"Reed J. Levine","Josiah","Reed","nunc.quisque@protonmail.couk","KNT03JSM6OI","per","PDY4JKASv8KASONKMASA51HBG3GL"),
(50,"Barbara I. Pugh","Tad","Price","risus.odio@gmaiil.net","CYB81CCR7VN","adipiscing","IYR3JKASX8KASoNKMASA98DFO2UF"),
(51,"Barbara L. Combs","Arden","Duncan","ut.pharetra.sed@yahoo.couk","JVQ40FRX3NM","mi","KBE2JKASi7KASiNKMASi48IEI2TX"),
(52,"Mufutau W. Horn","Roary","Torres","dolor.sit.amet@yahoo.ca","FPC34ISX2JB","eu","QAN4JKASo1KASONKMASe56JHO7AS"),
(53,"Miranda B. Acevedo","Cheryl","Jones","fringilla.est.mauris@google.srb","JCY24KTP6JO","auctor","FSG3JKASS6KASUNKMASI88YUS1QR"),
(54,"Beverly D. Young","Denton","Daniels","nunc.ullamcorper.eu@protonmail.srb","TQC61CMM5FB","morbi","TYN4JKASx8KASONKMASI66FHL5YW"),
(55,"Winifred F. Hughes","Juliet","Hester","etiam.vestibulum.massa@hotmail.net","RZR96WFE6CF","auctor,","CVJ5JKASS1KASONKMASi12ZQX2AW"),
(56,"Lucius V. Gallagher","Alisa","George","molestie@icloud.at","UYS61JIP4ET","facilisis.","LFD3JKASA8KASiNKMASa41JVO0RK"),
(57,"Yolanda F. Baker","Sylvia","Wilkinson","phasellus.dapibus@yahoo.couk","GKG30ILH5EY","in,","DNL8JKASSDKASUNKMASE34DCK4PY"),
(58,"Meghan I. Holt","Brooke","Barlow","nulla.integer@protonmail.de","KYG84KGC4MZ","risus.","KIX8JKASr4KASiNKMASu75YLZ5FK"),
(59,"Laith X. Mercado","Simone","Hines","facilisis.magna@google.org","ASL62LRJ6ON","commodo","RRH1JKASOBKASoNKMASi77BPB3JL"),
(60,"Octavius G. Coleman","Nora","Hines","elit@outlook.edu","XMN84OIQ6VB","lacinia","PKO4JKASQEKASoNKMASa01SZF6HV"),
(61,"Harlan I. O'Neill","Jasmine","Finley","purus.in@aol.at","LIZ32WUF3GN","Nulla","YQK3JKASO6KASiNKMASo46GII3XH"),
(62,"Tanner G. Dillon","Robin","Atkins","magna.nam@gmaiil.com","SWM81XVW8KH","mauris","DYQ7JKASt9KASANKMASa11FFL1LS"),
(63,"Hiroko S. Burton","Hoyt","Shepherd","nunc.quisque@gmaiil.srb","VQP68RYC9SW","velit","FSU8JKASR0KASENKMASa17REE0LC"),
(64,"Raven K. Forbes","Cara","Crosby","pellentesque.tellus@yahoo.net","TXZ27EOJ4FP","sit","ZEM4JKASyBKASANKMASa67CEI7BT"),
(65,"Naida V. Patel","Keelie","Bullock","a@outlook.ca","UWW78BJW4YX","ut","BLA2JKASNAKASINKMASI65SML1QC"),
(66,"Donna F. Gilliam","Mona","Hammond","neque.sed.sem@yahoo.de","CCP80PRD4DI","interdum","IXO6JKASWBKASeNKMASo35UKG8FE"),
(67,"Peter M. Lewis","Kevin","Durham","eget.metus.in@yahoo.at","SQK51PRO5NG","ut","WBR1JKASTDKASENKMASa86EGS3OH"),
(68,"Kalia S. Joyner","Ezra","Hopkins","suscipit@icloud.edu","DVT26XEW4HP","Aliquam","HEG9JKASqDKASUNKMASi09URC2RM"),
(69,"Nero Q. Frye","Judah","Cross","eu.tempor@outlook.com","VXK10RFT3ZJ","auctor","QLC2JKASB1KASENKMASu60LTN0GY"),
(70,"Courtney Q. Fuentes","Mechelle","Hester","dolor.elit@icloud.at","IYG34CSQ7PS","fames","DFQ1JKASR8KASINKMASi28BNC2DJ"),
(71,"Jada T. Meyer","Nora","Lang","quisque.porttitor@google.org","COU69MCX2VR","nunc","FOD7JKASvCKASANKMASI78ZBR6WC"),
(72,"Oscar N. Witt","Emerald","Berger","eget.magna@outlook.it","ICI32BTL9SB","amet","XOJ3JKASX1KASENKMASi18LIS9OH"),
(73,"Barrett E. Lawrence","Nina","Justice","vel.faucibus@yahoo.srb","NJQ11GQP6BA","Nulla","DTN3JKASu8KASiNKMASo38PMU4WH"),
(74,"Griffin H. Peters","Sean","Heath","velit.justo.nec@aol.us","RLG54DAZ6ZU","pharetra","QHQ6JKASHDKASiNKMASO36BNG8XF"),
(75,"Ashton J. Hood","Lucy","Randolph","nisl@aol.edu","BUH58XHR2KK","consequat,","HIY7JKASwCKASuNKMASe78HMT5HA"),
(76,"Gareth B. Reed","Ariana","Mack","turpis.nulla.aliquet@icloud.us","GLC32YCZ9CO","venenatis","MNC3JKASHEKASuNKMASE48GDV2OK"),
(77,"Kevin E. Munoz","David","Morrow","lacus@google.org","OZV09PRL9FJ","nascetur","PIX3JKASd6KASENKMASU85SKC8OO"),
(78,"Justine C. Chase","Kibo","Browning","aliquam.eros@google.it","AWQ01JNQ0ZM","dolor,","RCB5JKASYDKASINKMASa88JPF2JR"),
(79,"Caleb O. Mccarty","Armando","Richards","tincidunt.aliquam@icloud.srb","OPT81DYA8GC","fermentum","PIL7JKASkBKASUNKMASa65NEC8JW"),
(80,"Akeem Q. Casey","Ivy","Vaughn","pellentesque@hotmail.couk","WOF37NTK4QK","In","OBL8JKASkEKASANKMASi97DIX7UY"),
(81,"Winter G. Copeland","Orli","Woodard","tellus.justo.sit@protonmail.net","VLU06EJE0JW","sit","DMK1JKASr6KASoNKMASi89GFN7TU"),
(82,"Nissim S. King","Madison","Hunter","mollis.integer.tincidunt@yahoo.com","HDP62GVS7EU","congue.","FOU2JKASOBKASeNKMASE22CDF3YU"),
(83,"Jacqueline T. Munoz","Riley","Gordon","ligula.aenean@aol.edu","EKQ37XTN5OX","nunc","WWC8JKASl5KASANKMASo68WXW4FH"),
(84,"Nyssa G. Mcfadden","Ross","Gentry","lorem.donec@protonmail.net","UTZ24RZK1OP","lectus","MUX6JKASxEKASUNKMASO55TNV6JN"),
(85,"Heather D. Alford","Sandra","Stout","non@icloud.srb","OEV88KVC5FF","augue,","GAS2JKASV9KASUNKMASa11NBQ4FH"),
(86,"Paki P. Carpenter","Otto","Mcgowan","ullamcorper.velit@icloud.edu","TPX99JUN4LP","in","ETF8JKASjDKASeNKMASo86KQU2LY"),
(87,"Leroy S. Valdez","Shelby","Sykes","tristique.senectus@google.net","CAY13DRS4TA","dolor.","GPV2JKASg2KASONKMASO20UFT9ZM"),
(88,"Kane Q. Marquez","Quinlan","Blankenship","lacus.pede@hotmail.us","PUX27MVU8FW","Maecenas","MCK2JKASYAKASUNKMASo81GHG1GS"),
(89,"Ethan I. Richards","Avye","Martinez","egestas@outlook.it","KYF17VCA2TM","nec","NCN2JKASZCKASONKMASo18YKC2KB"),
(90,"Shaine G. Tyler","Phelan","Strickland","nullam.ut@hotmail.edu","RSV11RNQ8MU","dolor","QGF3JKASNDKASoNKMASE58RKS5XM"),
(91,"Germane V. Fuentes","Tucker","Kirk","ac.turpis.egestas@outlook.srb","EJX33EJN7RX","vitae,","HSL6JKASn9KASANKMASo80BNY4WM"),
(92,"Chanda A. Arnold","Sierra","Chase","auctor.mauris@google.us","QCL15GDX8IY","enim","HEI7JKASYDKASONKMASe57IVJ6RU"),
(93,"Callum V. Buchanan","Geoffrey","Christensen","est.ac@google.net","CYW37TAM1BO","felis","LUN6JKASuAKASENKMASE77BAE4JJ"),
(94,"Brady S. Zamora","Honorato","Stein","eu@yahoo.at","IJY07VZY2SY","dui,","NQU2JKASOCKASoNKMASO38UCN6TY"),
(95,"Kelly V. Barrera","Illiana","Small","ornare.fusce@google.de","JHC74MJG5UV","In","FVB8JKASu9KASuNKMASU33RXU9QD"),
(96,"Vera V. Farmer","Vernon","Langley","in@outlook.edu","OMS83EBB5YY","Curabitur","XED5JKASV8KASONKMASU02GFQ4HT"),
(97,"Nyssa I. Tate","Bert","Tyler","aenean.gravida@icloud.de","VXC31KQR3NG","eget","KMU1JKASi6KASONKMASU85TJK6RJ"),
(98,"Willa C. Jarvis","Brandon","Gutierrez","dis.parturient.montes@protonmail.us","XSQ11LIL8KK","ante.","GXS9JKASu8KASeNKMASa51HXT8QO"),
(99,"Drew P. Wright","Erin","Pearson","magna.sed.eu@yahoo.it","TOG35TLQ4FP","Aliquam","URL5JKASk9KASuNKMASi71OBN1WF"),
(100,"Julian T. Buck","Ferris","Jacobs","integer.urna@google.at","IIZ19ZNU1EH","mus.","WCU7JKASK3KASoNKMASE11RVQ0VY"),
(101,"Ferris N. Whitfield","Hayfa","Cohen","interdum.feugiat.sed@hotmail.edu","DYW39BYX5HB","Vivamus","FRS4JKASt0KASaNKMASa56LOH0WY"),
(102,"Halla K. Norman","Ora","Ballard","sit@icloud.us","EGP58SUS4MU","imperdiet","MXP7JKASKCKASoNKMASi75UPO3LN"),
(103,"Alice X. Guy","Matthew","Cherry","elit.pharetra@protonmail.at","EXW65HSD5PJ","eu,","GSM4JKASJBKASUNKMASe20GBS3PH"),
(104,"Maile S. Barr","Martena","Moran","massa@hotmail.at","XOM34NEM6BY","Integer","BTN6JKASkCKASoNKMASO13HVW9WF"),
(105,"Leroy X. Campbell","Gabriel","Burris","dolor.elit.pellentesque@protonmail.ca","NLK49OJF7HR","at","GHO3JKASaFKASeNKMASI51WRH4XW"),
(106,"Chloe P. Huff","Scarlett","Malone","dapibus.gravida@yahoo.net","MDB86LFI2EZ","fermentum","GRU8JKASp2KASANKMASO62QOO9YC");
/* #endregion */

-- FIELDS
CREATE TABLE IF NOT EXISTS fields(  
        id int AUTO_INCREMENT PRIMARY KEY NOT NULL, 
        name varchar(255) NOT NULL, 
        area int NOT NULL,
        unit ENUM("square meter", "hectar", "square kilometer", "square feet", "acre") NOT NULL,
        country varchar(2) NOT NULL,
        federalState varchar(255) NOT NULL,
        postalCode varchar(10) NOT NULL,
        street varchar(255) NOT NULL,
        latitude DOUBLE NULL,
        longitude DOUBLE NULL,
        description varchar(255) NOT NULL
    );

/* #region */

CREATE INDEX IF NOT EXISTS fieldsIndex ON fields(country, federalState);

INSERT IGNORE INTO fields (id, name, area, unit, country, federalState, postalCode, street, latitude, longitude, description) values (1, "Feld 1 von Bauer Mair", "61.1", "hectar", "AT", "Lower Austria", "2253", "Baumschulweg 1", 48.321341690830984, 16.76060675227691, "Feld in der gemeinde Weikendorf"); 
INSERT IGNORE INTO fields (id, name, area, unit, country, federalState, postalCode, street, latitude, longitude, description) values (2, "Feld 2 von Bauer Mair", "52.5", "hectar", "AT", "Lower Austria", "2253", "Baumschulweg 2", 48.32009899192484, 16.77198383327459, "Feld in der gemeinde Weikendorf"); 
INSERT IGNORE INTO fields (id, name, area, unit, country, federalState, postalCode, street, latitude, longitude, description) values (3, "Feld 3 von Bauer Mair", "46.1", "hectar", "AT", "Lower Austria", "2253", "Baumschulweg 3", 48.318047211159886, 16.781240240473593, "Feld in der gemeinde Weikendorf"); 

/* #endregion */
-- SENSORS
CREATE TABLE IF NOT EXISTS sensors(  
        id int AUTO_INCREMENT PRIMARY KEY NOT NULL,  
        fieldID int NOT NULL,
        type varchar(255) NULL,
        locationOnField varchar(255) NULL,
        Foreign key (fieldID) REFERENCES fields(id)
    );

/* #region */
CREATE INDEX IF NOT EXISTS sensorIndex ON sensors(fieldID, type, locationOnField);

INSERT IGNORE INTO sensors (id, fieldID, type, locationOnField) values 
/* id, fieldId, type locationOnField  */
(1, 1,'Temperatur', "middle"),
(2, 1,'Temperatur', "top left"), 
(3, 1,'Temperatur', "top right"), 
(4, 1,'Temperatur', "bottom left"), 
(5, 1,'Temperatur', "bottom right"), 
(6, 2,'Temperatur', "middle"), 
(7, 2,'Temperatur',  "top left"), 
(8, 3,'Temperatur', "middle"); 

/* #endregion */

-- SENSORVALUES
CREATE TABLE IF NOT EXISTS sensorValues(
    id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    sensorId int NOT NULL,
    value varchar(10) NOT NULL,
    timestamp TIMESTAMP  NOT NULL,
    Foreign KEY (sensorId) REFERENCES sensors(id)
);

/* #region */

/* CREATE INDEX IF NOT EXISTS valueIndex ON sensorValues(id, timestamp); */
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(18.88523476397277, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '0:00:00')),(2, round(17.65081691599382, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '0:00:00')),(3, round(19.37325975747264, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '0:00:00')),(4, round(18.131637496257113, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '0:00:00')),(5, round(20.10930930323138, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '0:00:00')),(6, round(16.92721288468879, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '0:00:00')),(7, round(16.980211332565165, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '0:00:00')),(8, round(18.40024768729394, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '0:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(21.011912822103604, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '1:00:00')),(2, round(19.19034330605958, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '1:00:00')),(3, round(19.79812723832059, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '1:00:00')),(4, round(23.01872368473073, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '1:00:00')),(5, round(22.870287997468996, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '1:00:00')),(6, round(22.714165724050357, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '1:00:00')),(7, round(21.988620180310548, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '1:00:00')),(8, round(22.48502642754684, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '1:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(20.006444788624098, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '2:00:00')),(2, round(23.763867792215354, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '2:00:00')),(3, round(24.137115442463422, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '2:00:00')),(4, round(20.100219020421783, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '2:00:00')),(5, round(22.863380154208304, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '2:00:00')),(6, round(21.714668756367246, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '2:00:00')),(7, round(20.26153291624043, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '2:00:00')),(8, round(24.037340136254734, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '2:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(22.215409632805578, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '3:00:00')),(2, round(26.15729335083546, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '3:00:00')),(3, round(23.16405526537753, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '3:00:00')),(4, round(27.263723548660106, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '3:00:00')),(5, round(23.74487332813507, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '3:00:00')),(6, round(25.799168926806452, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '3:00:00')),(7, round(23.365573114054705, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '3:00:00')),(8, round(27.68132454678373, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '3:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(28.31442690576457, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '4:00:00')),(2, round(29.71646423311342, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '4:00:00')),(3, round(24.364644514547457, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '4:00:00')),(4, round(29.752164413412334, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '4:00:00')),(5, round(25.574908313405015, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '4:00:00')),(6, round(24.965082636721625, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '4:00:00')),(7, round(26.936558785703372, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '4:00:00')),(8, round(24.343026223857983, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '4:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(27.853284778564934, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '5:00:00')),(2, round(30.342357022668235, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '5:00:00')),(3, round(27.53161069284053, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '5:00:00')),(4, round(28.46949747931243, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '5:00:00')),(5, round(28.768244683122326, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '5:00:00')),(6, round(30.29970826756209, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '5:00:00')),(7, round(28.560704688141524, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '5:00:00')),(8, round(33.39396028331709, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '5:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(35.906340734647664, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '6:00:00')),(2, round(34.457636858272856, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '6:00:00')),(3, round(29.64058796814979, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '6:00:00')),(4, round(33.67808357481862, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '6:00:00')),(5, round(35.990562640531515, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '6:00:00')),(6, round(33.94911144137307, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '6:00:00')),(7, round(36.034715623289095, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '6:00:00')),(8, round(36.345952796058555, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '6:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(35.843080372036695, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '7:00:00')),(2, round(34.629783979874745, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '7:00:00')),(3, round(34.66244524507677, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '7:00:00')),(4, round(38.87438223474267, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '7:00:00')),(5, round(35.43632299025441, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '7:00:00')),(6, round(35.55191111806715, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '7:00:00')),(7, round(33.015987219593754, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '7:00:00')),(8, round(39.25348607328884, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '7:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(35.545370334176674, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '8:00:00')),(2, round(38.744716629364525, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '8:00:00')),(3, round(38.15716577033491, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '8:00:00')),(4, round(44.14240226104199, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '8:00:00')),(5, round(36.033679375810145, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '8:00:00')),(6, round(40.71486300499483, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '8:00:00')),(7, round(38.46054868011762, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '8:00:00')),(8, round(35.676494307946136, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '8:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(47.76921662144547, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '9:00:00')),(2, round(45.16377553189849, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '9:00:00')),(3, round(46.6470406188316, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '9:00:00')),(4, round(40.01071132531303, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '9:00:00')),(5, round(43.24506319199777, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '9:00:00')),(6, round(40.30115187496158, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '9:00:00')),(7, round(39.97618596271137, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '9:00:00')),(8, round(41.5706150019021, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '9:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(49.97800622035709, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '10:00:00')),(2, round(52.19875297281407, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '10:00:00')),(3, round(52.647403761649, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '10:00:00')),(4, round(52.13267963669756, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '10:00:00')),(5, round(49.91035503339079, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '10:00:00')),(6, round(54.18738671625521, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '10:00:00')),(7, round(49.84278412239228, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '10:00:00')),(8, round(44.1129899166987, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '10:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(49.54799106886587, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '11:00:00')),(2, round(57.05683037458006, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '11:00:00')),(3, round(53.247403796547076, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '11:00:00')),(4, round(55.3428501270912, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '11:00:00')),(5, round(52.250345714100995, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '11:00:00')),(6, round(53.84199478872935, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '11:00:00')),(7, round(58.194264925057766, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '11:00:00')),(8, round(52.43714163083507, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '11:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(61.68200945835347, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '12:00:00')),(2, round(58.934892240221764, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '12:00:00')),(3, round(64.7690425944555, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '12:00:00')),(4, round(55.7247077304753, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '12:00:00')),(5, round(58.54363652812883, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '12:00:00')),(6, round(56.14227578521849, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '12:00:00')),(7, round(62.45450849011952, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '12:00:00')),(8, round(63.38559183817145, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '12:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(61.450543752218415, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '13:00:00')),(2, round(69.899803962406, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '13:00:00')),(3, round(59.22736513445222, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '13:00:00')),(4, round(63.53254438815159, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '13:00:00')),(5, round(61.04734378356753, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '13:00:00')),(6, round(65.00768529789332, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '13:00:00')),(7, round(63.067642031003004, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '13:00:00')),(8, round(71.27720986033525, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '13:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(60.98345527516155, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '14:00:00')),(2, round(64.22065178930191, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '14:00:00')),(3, round(53.66619814364876, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '14:00:00')),(4, round(52.025470242322555, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '14:00:00')),(5, round(61.836127359061, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '14:00:00')),(6, round(65.39916171487286, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '14:00:00')),(7, round(63.18484831400097, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '14:00:00')),(8, round(60.290563531600625, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '14:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(50.46220540061967, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '15:00:00')),(2, round(48.17548592855557, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '15:00:00')),(3, round(55.68215646055032, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '15:00:00')),(4, round(58.25679039664619, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '15:00:00')),(5, round(50.800370358279096, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '15:00:00')),(6, round(59.26908368891883, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '15:00:00')),(7, round(55.42239645643273, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '15:00:00')),(8, round(58.00933563549298, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '15:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(43.245356560277266, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '16:00:00')),(2, round(53.49326105682879, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '16:00:00')),(3, round(51.07270545150613, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '16:00:00')),(4, round(47.287763200032835, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '16:00:00')),(5, round(49.46259223600566, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '16:00:00')),(6, round(52.60323626521968, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '16:00:00')),(7, round(51.130148527797104, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '16:00:00')),(8, round(46.91314483876647, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '16:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(43.504686450538905, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '17:00:00')),(2, round(44.65725759633348, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '17:00:00')),(3, round(42.27857826213978, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '17:00:00')),(4, round(39.815735066140306, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '17:00:00')),(5, round(39.28693467954271, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '17:00:00')),(6, round(47.95274274557372, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '17:00:00')),(7, round(48.97419180293853, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '17:00:00')),(8, round(43.087995936817634, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '17:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(38.48312138217043, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '18:00:00')),(2, round(36.46866352731284, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '18:00:00')),(3, round(36.77761145580651, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '18:00:00')),(4, round(42.80172490788181, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '18:00:00')),(5, round(37.82452024869539, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '18:00:00')),(6, round(39.0991631648567, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '18:00:00')),(7, round(37.77753775294588, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '18:00:00')),(8, round(38.275884824764375, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '18:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(39.59047748641182, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '19:00:00')),(2, round(33.29134018106537, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '19:00:00')),(3, round(35.45833099579664, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '19:00:00')),(4, round(32.45800472406185, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '19:00:00')),(5, round(33.859042329415736, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '19:00:00')),(6, round(36.62781849242163, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '19:00:00')),(7, round(32.36303717946602, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '19:00:00')),(8, round(39.11837711347731, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '19:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(35.34084286609263, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '20:00:00')),(2, round(30.33455114115804, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '20:00:00')),(3, round(32.72388909901384, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '20:00:00')),(4, round(35.76237680107031, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '20:00:00')),(5, round(32.00717201235758, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '20:00:00')),(6, round(35.36497318168541, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '20:00:00')),(7, round(32.71709640998909, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '20:00:00')),(8, round(36.45488320282241, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '20:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(32.22232755875881, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '21:00:00')),(2, round(32.23499177599351, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '21:00:00')),(3, round(33.19483887323987, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '21:00:00')),(4, round(33.04441732407338, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '21:00:00')),(5, round(29.628450606591503, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '21:00:00')),(6, round(29.147896324090652, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '21:00:00')),(7, round(33.01203496847139, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '21:00:00')),(8, round(33.07750690458186, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '21:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(24.949168105769353, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '22:00:00')),(2, round(26.720663146598792, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '22:00:00')),(3, round(25.536508620892025, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '22:00:00')),(4, round(24.529228255338115, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '22:00:00')),(5, round(25.008330275088525, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '22:00:00')),(6, round(29.719141251570562, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '22:00:00')),(7, round(28.158368590361558, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '22:00:00')),(8, round(27.63886940428137, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '22:00:00'));
INSERT IGNORE INTO sensorValues (sensorId, value, timestamp) values(1, round(27.38179096922858, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '23:00:00')),(2, round(25.335357542724406, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '23:00:00')),(3, round(24.595520898674216, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '23:00:00')),(4, round(27.05221116029584, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '23:00:00')),(5, round(24.441821343302625, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '23:00:00')),(6, round(22.837915389508503, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '23:00:00')),(7, round(27.41099064417322, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '23:00:00')),(8, round(25.217828004756285, 1), TIMESTAMP(CONCAT(CURDATE(), ' 00:00:00'), '23:00:00'));



/* #endregion */

-- SETTINGS
CREATE TABLE IF NOT EXISTS settings(
    id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userID int NOT NULL,
    displayedUsername varchar(255) NOT NULL,
    primaryColor varchar(255) NOT NULL,
    secondaryColor varchar(255) NOT NULL,
    tertiaryColor varchar(255) NOT NULL,
    textColor varchar(255) NOT NULL,
    fontSize varchar(255) NOT NULL,
    animations boolean NOT NULL,
    Foreign KEY (userID) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS plants(
    id int PRIMARY KEY,
    name varchar(255) NOT NULL,
    type ENUM("fruit", "vegetable", "fungi", "not yet set"),
    growTime int NOT NULL,  -- days to grow from zero to harvestable
    oneTimeHarvest boolean NULL,
    -- Zum Beispiel bei Bäumen dauert es ja am Anfang mehrere Jahre bis diese wachsen und dann
    -- sind sie meistens jedes Jahr erntbar
    timeUntilNextHarvest int NULL  
);

/* #region   */
INSERT INTO plants (id, name, type, growTime, oneTimeHarvest) values
(0, "Alfalfa Sprouts", "not yet set", 365, 1),
(1, "Apple", "not yet set", 365, 1),
(2, "Apricot", "not yet set", 365, 1),
(3, "Artichoke", "not yet set", 365, 1),
(4, "Asian Pear", "not yet set", 365, 1),
(5, "Asparagus", "not yet set", 365, 1),
(6, "Atemoya", "not yet set", 365, 1),
(7, "Avocado", "not yet set", 365, 1),
(8, "Bamboo Shoots", "not yet set", 365, 1),
(9, "Banana", "not yet set", 365, 1),
(10, "Bean Sprouts", "not yet set", 365, 1),
(11, "Beans", "not yet set", 365, 1),
(12, "Beets", "not yet set", 365, 1),
(13, "Belgian Endive", "not yet set", 365, 1),
(14, "Bell Peppers", "not yet set", 365, 1),
(15, "Bitter Melon", "not yet set", 365, 1),
(16, "Blackberries", "not yet set", 365, 1),
(17, "Blueberries", "not yet set", 365, 1),
(18, "Bok Choy", "not yet set", 365, 1),
(19, "Boniato", "not yet set", 365, 1),
(20, "Boysenberries", "not yet set", 365, 1),
(21, "Broccoflower", "not yet set", 365, 1),
(22, "Broccoli", "not yet set", 365, 1),
(23, "Brussels Sprouts", "not yet set", 365, 1),
(24, "Cabbage", "not yet set", 365, 1),
(25, "Cactus Pear", "not yet set", 365, 1),
(26, "Cantaloupe", "not yet set", 365, 1),
(27, "Carambola", "not yet set", 365, 1),
(28, "Carrots", "not yet set", 365, 1),
(29, "Casaba Melon", "not yet set", 365, 1),
(30, "Cauliflower", "not yet set", 365, 1),
(31, "Celery", "not yet set", 365, 1),
(32, "Chayote", "not yet set", 365, 1),
(33, "Cherimoya", "not yet set", 365, 1),
(34, "Cherries", "not yet set", 365, 1),
(35, "Coconuts", "not yet set", 365, 1),
(36, "Collard Greens", "not yet set", 365, 1),
(37, "Corn", "not yet set", 365, 1),
(38, "Cranberries", "not yet set", 365, 1),
(39, "Cucumber", "not yet set", 365, 1),
(40, "Dates", "not yet set", 365, 1),
(41, "Dried Plums", "not yet set", 365, 1),
(42, "Eggplant", "not yet set", 365, 1),
(43, "Endive", "not yet set", 365, 1),
(44, "Escarole", "not yet set", 365, 1),
(45, "Feijoa", "not yet set", 365, 1),
(46, "Fennel", "not yet set", 365, 1),
(47, "Figs", "not yet set", 365, 1),
(48, "Garlic", "not yet set", 365, 1),
(49, "Gooseberries", "not yet set", 365, 1),
(50, "Grapefruit", "not yet set", 365, 1),
(51, "Grapes", "not yet set", 365, 1),
(52, "Green Beans", "not yet set", 365, 1),
(53, "Green Onions", "not yet set", 365, 1),
(54, "Greens", "not yet set", 365, 1),
(55, "Guava", "not yet set", 365, 1),
(56, "Hominy", "not yet set", 365, 1),
(57, "Honeydew Melon", "not yet set", 365, 1),
(58, "Horned Melon", "not yet set", 365, 1),
(59, "Iceberg Lettuce", "not yet set", 365, 1),
(60, "Jerusalem Artichok", "not yet set", 365, 1),
(61, "Jicama", "not yet set", 365, 1),
(62, "Kale", "not yet set", 365, 1),
(63, "Kiwifruit", "not yet set", 365, 1),
(64, "Kohlrabi", "not yet set", 365, 1),
(65, "Kumquat", "not yet set", 365, 1),
(66, "Leeks", "not yet set", 365, 1),
(67, "Lemons", "not yet set", 365, 1),
(68, "Lettuce", "not yet set", 365, 1),
(69, "Lima Beans", "not yet set", 365, 1),
(70, "Limes", "not yet set", 365, 1),
(71, "Longan", "not yet set", 365, 1),
(72, "Loquat", "not yet set", 365, 1),
(73, "Lychee", "not yet set", 365, 1),
(74, "Madarins", "not yet set", 365, 1),
(75, "Malanga", "not yet set", 365, 1),
(76, "Mandarin Oranges", "not yet set", 365, 1),
(77, "Mangos", "not yet set", 365, 1),
(78, "Mulberries", "not yet set", 365, 1),
(79, "Mushrooms", "not yet set", 365, 1),
(80, "Napa", "not yet set", 365, 1),
(81, "Nectarines", "not yet set", 365, 1),
(82, "Okra", "not yet set", 365, 1),
(83, "Onion", "not yet set", 365, 1),
(84, "Oranges", "not yet set", 365, 1),
(85, "Papayas", "not yet set", 365, 1),
(86, "Parsnip", "not yet set", 365, 1),
(87, "Passion Fruit", "not yet set", 365, 1),
(88, "Peaches", "not yet set", 365, 1),
(89, "Pears", "not yet set", 365, 1),
(90, "Peas", "not yet set", 365, 1),
(91, "Peppers", "not yet set", 365, 1),
(92, "Persimmons", "not yet set", 365, 1),
(93, "Pineapple", "not yet set", 365, 1),
(94, "Plantains", "not yet set", 365, 1),
(95, "Plums", "not yet set", 365, 1),
(96, "Pomegranate", "not yet set", 365, 1),
(97, "Potatoes", "not yet set", 365, 1),
(98, "Prickly Pear", "not yet set", 365, 1),
(99, "Prunes", "not yet set", 365, 1),
(100, "Pummelo", "not yet set", 365, 1),
(101, "Pumpkin", "not yet set", 365, 1),
(102, "Quince", "not yet set", 365, 1),
(103, "Radicchio", "not yet set", 365, 1),
(104, "Radishes", "not yet set", 365, 1),
(105, "Raisins", "not yet set", 365, 1),
(106, "Raspberries", "not yet set", 365, 1),
(107, "Red Cabbage", "not yet set", 365, 1),
(108, "Rhubarb", "not yet set", 365, 1),
(109, "Romaine Lettuce", "not yet set", 365, 1),
(110, "Rutabaga", "not yet set", 365, 1),
(111, "Shallots", "not yet set", 365, 1),
(112, "Snow Peas", "not yet set", 365, 1),
(113, "Spinach", "not yet set", 365, 1),
(114, "Sprouts", "not yet set", 365, 1),
(115, "Squash", "not yet set", 365, 1),
(116, "Strawberries", "not yet set", 365, 1),
(117, "String Beans", "not yet set", 365, 1),
(118, "Sweet Potato", "not yet set", 365, 1),
(119, "Tangelo", "not yet set", 365, 1),
(120, "Tangerines", "not yet set", 365, 1),
(121, "Tomatillo", "not yet set", 365, 1),
(122, "Tomato", "not yet set", 365, 1),
(123, "Turnip", "not yet set", 365, 1),
(124, "Ugli Fruit", "not yet set", 365, 1),
(125, "Water Chestnuts", "not yet set", 365, 1),
(126, "Watercress", "not yet set", 365, 1),
(127, "Watermelon", "not yet set", 365, 1),
(128, "Waxed Beans", "not yet set", 365, 1),
(129, "Yams", "not yet set", 365, 1),
(130, "Yellow Squash", "not yet set", 365, 1),
(131, "Yuca/Cassava", "not yet set", 365, 1),
(132, "Zucchini Squash", "not yet set", 365, 1);
/* #endregion   )*/

CREATE TABLE IF NOT EXISTS plantedCrop(
    id int PRIMARY KEY AUTO_INCREMENT,
    fieldId int NOT NULL,
    plantedDate TIMESTAMP NOT NULL,
    plantId int NOT NULL,
    FOREIGN KEY (fieldId) REFERENCES fields(id),
    FOREIGN KEY (plantId) REFERENCES plants(id)
);

SET @MIN = "2022-04-01 00:53:27";
SET @MAX = now();

INSERT INTO plantedCrop (fieldId, plantedDate, plantId) values 
(1, TIMESTAMPADD(SECOND, FLOOR(RAND() * TIMESTAMPDIFF(SECOND, @MIN, @MAX)), @MIN), 1),  -- Apple
(2, TIMESTAMPADD(SECOND, FLOOR(RAND() * TIMESTAMPDIFF(SECOND, @MIN, @MAX)), @MIN), 37),  -- Corn
(3, TIMESTAMPADD(SECOND, FLOOR(RAND() * TIMESTAMPDIFF(SECOND, @MIN, @MAX)), @MIN), 39);  -- cucumber