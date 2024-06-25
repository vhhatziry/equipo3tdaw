drop database registro_tutorias;
create database registro_tutorias;
use registro_tutorias;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `alumno` (
  `boleta` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nombre` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `primerApe` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `segundoApe` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `telefono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `semestre` int(11) NOT NULL,
  `carrera` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `correo_electronico` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `contrasena` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tutor_preferido` enum('hombre','mujer') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `alumno`
  ADD PRIMARY KEY (`boleta`);
COMMIT;

CREATE TABLE `admin` (
  `username` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE tutor (
    idTutor VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(64) NOT NULL,
    genero ENUM('hombre', 'mujer') NOT NULL,
    numAlumnos INT DEFAULT 0 -- Columna para contar el número de alumnos
);


CREATE TABLE tutoria (
    idTutoria VARCHAR(10) PRIMARY KEY,
    nombreTutoria VARCHAR(30) NOT NULL
);

CREATE TABLE tutor_tutoria (
    idTutor VARCHAR(10),
    idTutoria VARCHAR(10),
    PRIMARY KEY (idTutor, idTutoria),
    FOREIGN KEY (idTutor) REFERENCES tutor(idTutor),
    FOREIGN KEY (idTutoria) REFERENCES tutoria(idTutoria)
);

CREATE TABLE alumno_tutor (
    boleta VARCHAR(10) CHARACTER SET utf8 COLLATE utf8_general_ci PRIMARY KEY,
    idTutor VARCHAR(10),
    idTutoria VARCHAR(10),
    FOREIGN KEY (boleta) REFERENCES alumno(boleta),
    FOREIGN KEY (idTutor) REFERENCES tutor(idTutor),
    FOREIGN KEY (idTutoria) REFERENCES tutoria(idTutoria)
);

DELIMITER //

CREATE TRIGGER before_insert_tutor_tutoria
BEFORE INSERT ON tutor_tutoria
FOR EACH ROW
BEGIN
    DECLARE tutorias_count INT;

    SELECT COUNT(*) INTO tutorias_count
    FROM tutor_tutoria
    WHERE idTutor = NEW.idTutor;

    IF tutorias_count >= 3 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Un tutor no puede tener más de 3 tutorías.';
    END IF;
END; //

CREATE TRIGGER before_insert_alumno_tutor
BEFORE INSERT ON alumno_tutor
FOR EACH ROW
BEGIN
    DECLARE tutoria_existe INT;

    SELECT COUNT(*) INTO tutoria_existe
    FROM tutor_tutoria
    WHERE idTutor = NEW.idTutor AND idTutoria = NEW.idTutoria;

    IF tutoria_existe = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El tutor no imparte la tutoría seleccionada.';
    END IF;
END; //

CREATE TRIGGER before_insert_alumno_tutor2
BEFORE INSERT ON alumno_tutor
FOR EACH ROW
BEGIN
  DECLARE tutoria_existe INT;
  DECLARE alumnos_tutor INT;

  SELECT COUNT(*) INTO tutoria_existe
  FROM tutor_tutoria
  WHERE idTutor = NEW.idTutor AND idTutoria = NEW.idTutoria;

  SELECT numAlumnos INTO alumnos_tutor
  FROM tutor
  WHERE idTutor = NEW.idTutor;

  IF tutoria_existe = 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El tutor no imparte la tutoría seleccionada.';
  ELSEIF alumnos_tutor >= 15 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El tutor ya tiene el máximo de alumnos permitidos (15).';
  END IF;
END; //

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_delete_alumno
BEFORE DELETE ON alumno
FOR EACH ROW
BEGIN
    -- Eliminar relaciones en alumno_tutor
    DELETE FROM alumno_tutor WHERE boleta = OLD.boleta;

    -- Reducir el número de alumnos del tutor
    UPDATE tutor t
    JOIN alumno_tutor at ON t.idTutor = at.idTutor
    SET t.numAlumnos = t.numAlumnos - 1
    WHERE at.boleta = OLD.boleta;
END; //

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_insert_alumno_tutor
AFTER INSERT ON alumno_tutor
FOR EACH ROW
BEGIN
    -- Aumentar el número de alumnos del tutor
    UPDATE tutor
    SET numAlumnos = numAlumnos + 1
    WHERE idTutor = NEW.idTutor;
END; //

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_delete_alumno_tutor
AFTER DELETE ON alumno_tutor
FOR EACH ROW
BEGIN
    -- Reducir el número de alumnos del tutor
    UPDATE tutor
    SET numAlumnos = numAlumnos - 1
    WHERE idTutor = OLD.idTutor;
END; //

DELIMITER ;




INSERT INTO `admin`(`username`, `Password`) VALUES ('admin','pasword');

INSERT INTO `alumno` (`boleta`, `nombre`, `primerApe`, `segundoApe`, `telefono`, `semestre`, `carrera`, `correo_electronico`, `contrasena`, `tutor_preferido`) VALUES
('2020101111', 'Juan', 'Pérez', 'González', '5551112222', 2, 'Ingeniería en Sistemas Computacionales', 'juanperez@alumno.ipn.mx', 'Password123', 'hombre'),
('2020101234', 'Ana', 'Martínez', 'García', '5551234567', 5, 'Ingeniería en Sistemas Computacionales', 'ana.martinez@alumno.ipn.mx', 'Password123', 'mujer'),
('2020102222', 'María', 'García', 'Martínez', '5552223333', 4, 'Licenciatura en Ciencia De Datos', 'maria.garcia@alumno.ipn.mx', 'Password456', 'mujer'),
('2020103333', 'Pedro', 'López', 'Hernández', '5553334444', 6, 'Ingeniería en Inteligencia Artificial', 'pedro.lopez@alumno.ipn.mx', 'Password789', 'hombre'),
('2020105678', 'Luis', 'Hernández', 'Pérez', '5552345678', 7, 'Licenciatura en Ciencia De Datos', 'luis.hernandez@alumno.ipn.mx', 'Password456', 'hombre'),
('2020109012', 'Karla', 'Ramírez', 'López', '5553456789', 3, 'Ingeniería en Sistemas Computacionales', 'karla.ramirez@alumno.ipn.mx', 'Password789', 'mujer'),
('2023720585', 'Diego', 'Alvaréz', 'Martínez', '5512068998', 3, 'Ingeniería en Inteligencia Artificial', 'ajsda@alumno.ipn.mx', 'dieguitomaradona', 'mujer'),
('2035555555', 'Goku', 'Saiyayin', 'Pro', '5654654655', 5, 'Licenciatura en Ciencia De Datos', 'holasoygoku@alumno.ipn.mx', 'yeahseñoreskamehameha', 'mujer'),
('2020111111', 'Carlos', 'Pérez', 'Ramírez', '5551113333', 1, 'Ingeniería en Sistemas Computacionales', 'carlos.perez@alumno.ipn.mx', 'Password111', 'hombre'),
('2020112222', 'Laura', 'Martínez', 'González', '5551114444', 2, 'Ingeniería en Sistemas Computacionales', 'laura.martinez@alumno.ipn.mx', 'Password222', 'mujer'),
('2020113333', 'Marta', 'García', 'López', '5551115555', 3, 'Ingeniería en Inteligencia Artificial', 'marta.garcia@alumno.ipn.mx', 'Password333', 'mujer'),
('2020114444', 'Pedro', 'López', 'González', '5551116666', 4, 'Ingeniería en Sistemas Computacionales', 'pedro.lopez2@alumno.ipn.mx', 'Password444', 'hombre'),
('2020115555', 'Luis', 'Hernández', 'Ramírez', '5551117777', 5, 'Ingeniería en Sistemas Computacionales', 'luis.hernandez2@alumno.ipn.mx', 'Password555', 'hombre'),
('2020116666', 'Ana', 'Pérez', 'Martínez', '5551118888', 6, 'Ingeniería en Inteligencia Artificial', 'ana.perez@alumno.ipn.mx', 'Password666', 'mujer'),
('2020117777', 'Diego', 'Ramírez', 'García', '5551119999', 7, 'Ingeniería en Sistemas Computacionales', 'diego.ramirez@alumno.ipn.mx', 'Password777', 'hombre'),
('2020118888', 'Karla', 'González', 'Pérez', '5551120000', 8, 'Ingeniería en Sistemas Computacionales', 'karla.gonzalez@alumno.ipn.mx', 'Password888', 'mujer'),
('2020119999', 'Juan', 'Martínez', 'Hernández', '5551121111', 9, 'Ingeniería en Inteligencia Artificial', 'juan.martinez@alumno.ipn.mx', 'Password999', 'hombre'),
('2020120000', 'María', 'López', 'Ramírez', '5551122222', 2, 'Ingeniería en Sistemas Computacionales', 'maria.lopez@alumno.ipn.mx', 'Password000', 'mujer'),
('2020121111', 'Carlos', 'Hernández', 'González', '5551123333', 3, 'Licenciatura en Ciencia De Datos', 'carlos.hernandez@alumno.ipn.mx', 'Password1111', 'hombre'),
('2020122222', 'Laura', 'García', 'Pérez', '5551124444', 4, 'Ingeniería en Inteligencia Artificial', 'laura.garcia@alumno.ipn.mx', 'Password2222', 'mujer'),
('2020123333', 'Marta', 'Ramírez', 'Martínez', '5551125555', 5, 'Ingeniería en Sistemas Computacionales', 'marta.ramirez@alumno.ipn.mx', 'Password3333', 'mujer'),
('2020124444', 'Pedro', 'González', 'López', '5551126666', 6, 'Licenciatura en Ciencia De Datos', 'pedro.gonzalez@alumno.ipn.mx', 'Password4444', 'hombre'),
('2020125555', 'Luis', 'Pérez', 'Ramírez', '5551127777', 7, 'Ingeniería en Inteligencia Artificial', 'luis.perez@alumno.ipn.mx', 'Password5555', 'hombre'),
('2020126666', 'Ana', 'Martínez', 'González', '5551128888', 8, 'Ingeniería en Sistemas Computacionales', 'ana.martinez2@alumno.ipn.mx', 'Password6666', 'mujer'),
('2020127777', 'Diego', 'García', 'Pérez', '5551129999', 9, 'Licenciatura en Ciencia De Datos', 'diego.garcia@alumno.ipn.mx', 'Password7777', 'hombre'),
('2020128888', 'Karla', 'Ramírez', 'López', '5551130000', 1, 'Ingeniería en Inteligencia Artificial', 'karla.ramirez2@alumno.ipn.mx', 'Password8888', 'mujer'),
('2020129999', 'Juan', 'Hernández', 'Martínez', '5551131111', 2, 'Ingeniería en Sistemas Computacionales', 'juan.hernandez@alumno.ipn.mx', 'Password9999', 'hombre'),
('2020130000', 'María', 'Pérez', 'González', '5551132222', 3, 'Licenciatura en Ciencia De Datos', 'maria.perez@alumno.ipn.mx', 'Password0000', 'mujer'),
('2020131111', 'Miguel', 'Domínguez', 'Núñez', '5551231111', 2, 'Ingeniería en Sistemas Computacionales', 'miguel.dominguez@alumno.ipn.mx', 'Password101', 'hombre'),
('2020132222', 'Sara', 'Morales', 'Ortega', '5551232222', 3, 'Licenciatura en Ciencia De Datos', 'sara.morales@alumno.ipn.mx', 'Password202', 'mujer'),
('2020133333', 'Sofía', 'Navarro', 'Díaz', '5551233333', 4, 'Ingeniería en Inteligencia Artificial', 'sofia.navarro@alumno.ipn.mx', 'Password303', 'mujer'),
('2020134444', 'Jorge', 'Ramos', 'Reyes', '5551234444', 5, 'Ingeniería en Sistemas Computacionales', 'jorge.ramos@alumno.ipn.mx', 'Password404', 'hombre'),
('2020135555', 'Claudia', 'Flores', 'Castro', '5551235555', 6, 'Licenciatura en Ciencia De Datos', 'claudia.flores@alumno.ipn.mx', 'Password505', 'mujer'),
('2020136666', 'Fernando', 'Vega', 'Sánchez', '5551236666', 7, 'Ingeniería en Inteligencia Artificial', 'fernando.vega@alumno.ipn.mx', 'Password606', 'hombre'),
('2020137777', 'Diana', 'Ríos', 'Torres', '5551237777', 8, 'Ingeniería en Sistemas Computacionales', 'diana.rios@alumno.ipn.mx', 'Password707', 'mujer'),
('2020138888', 'Ricardo', 'Mendoza', 'Guzmán', '5551238888', 9, 'Licenciatura en Ciencia De Datos', 'ricardo.mendoza@alumno.ipn.mx', 'Password808', 'hombre'),
('2020139999', 'Patricia', 'Cruz', 'Aguilar', '5551239999', 1, 'Ingeniería en Inteligencia Artificial', 'patricia.cruz@alumno.ipn.mx', 'Password909', 'mujer'),
('2020140000', 'Alberto', 'Herrera', 'Jiménez', '5551240000', 2, 'Ingeniería en Sistemas Computacionales', 'alberto.herrera@alumno.ipn.mx', 'Password010', 'hombre'),
('2020141111', 'Gabriela', 'Chávez', 'Ortiz', '5551241111', 3, 'Licenciatura en Ciencia De Datosn', 'gabriela.chavez@alumno.ipn.mx', 'Password111', 'mujer'),
('2020142222', 'José', 'Gómez', 'Rojas', '5551242222', 4, 'Ingeniería en Inteligencia Artificial', 'jose.gomez@alumno.ipn.mx', 'Password212', 'hombre'),
('2020143333', 'Elena', 'Martín', 'Silva', '5551243333', 5, 'Ingeniería en Sistemas Computacionales', 'elena.martin@alumno.ipn.mx', 'Password313', 'mujer'),
('2020144444', 'Samuel', 'Soto', 'Luna', '5551244444', 6, 'Licenciatura en Ciencia De Datos', 'samuel.soto@alumno.ipn.mx', 'Password414', 'hombre'),
('2020145555', 'Marisol', 'León', 'Vargas', '5551245555', 7, 'Ingeniería en Inteligencia Artificial', 'marisol.leon@alumno.ipn.mx', 'Password515', 'mujer'),
('2020146666', 'Hugo', 'Castillo', 'Mora', '5551246666', 8, 'Ingeniería en Sistemas Computacionales', 'hugo.castillo@alumno.ipn.mx', 'Password616', 'hombre'),
('2020147777', 'Nadia', 'Ibarra', 'Salazar', '5551247777', 9, 'Licenciatura en Ciencia De Datos', 'nadia.ibarra@alumno.ipn.mx', 'Password717', 'mujer'),
('2020148888', 'Esteban', 'Medina', 'Figueroa', '5551248888', 1, 'Ingeniería en Inteligencia Artificial', 'esteban.medina@alumno.ipn.mx', 'Password818', 'hombre'),
('2020149999', 'Verónica', 'Campos', 'Romero', '5551249999', 2, 'Ingeniería en Sistemas Computacionales', 'veronica.campos@alumno.ipn.mx', 'Password919', 'mujer'),
('2020150000', 'Rafael', 'Guerrero', 'Hernández', '5551250000', 3, 'Licenciatura en Ciencia De Datos', 'rafael.guerrero@alumno.ipn.mx', 'Password020', 'hombre');

INSERT INTO tutoria (idTutoria, nombreTutoria) VALUES
('TUT01', 'Individual'),
('TUT02', 'Grupal'),
('TUT03', 'Recuperación académica'),
('TUT04', 'Regularización'),
('TUT05', 'Pares');

INSERT INTO tutor (idTutor, nombre, genero) VALUES
('T001', 'Martha Patricia Jiménez Villanueva', 'mujer'),
('T002', 'Patricia Escamilla Miranda', 'mujer'),
('T003', 'Laura Méndez Segundo', 'mujer'),
('T004', 'Laura Muñoz Salazar', 'mujer'),
('T005', 'Judith Margarita Tirado Lule', 'mujer'),
('T006', 'Karina Viveros Vela', 'mujer'),
('T007', 'Rocio Palacios Solano', 'mujer'),
('T008', 'Claudia Díaz Huerta', 'mujer'),
('T009', 'Elia Ramírez Martínez', 'mujer'),
('T010', 'Gabriela López Ruiz', 'mujer'),
('T011', 'José Asunción Enríquez Zárate', 'hombre'),
('T012', 'Alberto Jesús Alcántara Méndez', 'hombre'),
('T013', 'Felipe de Jesús Figueroa del Prado', 'hombre'),
('T014', 'Erick Linares Vallejo', 'hombre'),
('T015', 'Edgar Armando Catalán', 'hombre'),
('T016', 'Jorge Cortés Galicia', 'hombre'),
('T017', 'Edgardo Franco Martínez', 'hombre'),
('T018', 'Vicente García Sales', 'hombre'),
('T019', 'Iván Mosso García', 'hombre'),
('T020', 'Miguel Ángel Rodríguez', 'hombre');

INSERT INTO tutor_tutoria (idTutor, idTutoria) VALUES
('T001', 'TUT01'), ('T001', 'TUT02'), ('T001', 'TUT03'), 
('T002', 'TUT04'), ('T002', 'TUT05'), ('T002', 'TUT01'),
('T003', 'TUT02'), ('T003', 'TUT03'), ('T003', 'TUT04'),
('T004', 'TUT05'), ('T004', 'TUT01'), ('T004', 'TUT02'),
('T005', 'TUT03'), ('T005', 'TUT04'), ('T005', 'TUT05'),
('T006', 'TUT01'), ('T006', 'TUT02'), ('T006', 'TUT03'),
('T007', 'TUT04'), ('T007', 'TUT05'), ('T007', 'TUT01'),
('T008', 'TUT02'), ('T008', 'TUT03'), ('T008', 'TUT04'),
('T009', 'TUT05'), ('T009', 'TUT01'), ('T009', 'TUT02'),
('T010', 'TUT03'), ('T010', 'TUT04'), ('T010', 'TUT05'),
('T011', 'TUT01'), ('T011', 'TUT02'), ('T011', 'TUT03'),
('T012', 'TUT04'), ('T012', 'TUT05'), ('T012', 'TUT01'),
('T013', 'TUT02'), ('T013', 'TUT03'), ('T013', 'TUT04'),
('T014', 'TUT05'), ('T014', 'TUT01'), ('T014', 'TUT02'),
('T015', 'TUT03'), ('T015', 'TUT04'), ('T015', 'TUT05'),
('T016', 'TUT01'), ('T016', 'TUT02'), ('T016', 'TUT04'),
('T017', 'TUT03'), ('T017', 'TUT05'), ('T017', 'TUT01'),
('T018', 'TUT02'), ('T018', 'TUT04'), ('T018', 'TUT05'),
('T019', 'TUT01'), ('T019', 'TUT03'), ('T019', 'TUT02'),
('T020', 'TUT04'), ('T020', 'TUT05'), ('T020', 'TUT03');

SELECT t.idTutor, t.nombre, GROUP_CONCAT(tut.nombreTutoria SEPARATOR ', ') AS tutorias_impartidas
FROM tutor t
LEFT JOIN tutor_tutoria tt ON t.idTutor = tt.idTutor
LEFT JOIN tutoria tut ON tt.idTutoria = tut.idTutoria
GROUP BY t.idTutor, t.nombre;

INSERT INTO alumno_tutor VALUES ('2020101111', 'T001', 'TUT01');
INSERT INTO alumno_tutor VALUES ('2020101234', 'T001', 'TUT02');
INSERT INTO alumno_tutor VALUES ('2020102222', 'T001', 'TUT03');
INSERT INTO alumno_tutor VALUES ('2020103333', 'T001', 'TUT01');
INSERT INTO alumno_tutor VALUES ('2020105678', 'T001', 'TUT02');
INSERT INTO alumno_tutor VALUES ('2020109012', 'T001', 'TUT03');

INSERT INTO alumno_tutor VALUES ('2023720585', 'T002', 'TUT04');
INSERT INTO alumno_tutor VALUES ('2035555555', 'T002', 'TUT05');
INSERT INTO alumno_tutor VALUES ('2020111111', 'T002', 'TUT01');
INSERT INTO alumno_tutor VALUES ('2020112222', 'T002', 'TUT04');
INSERT INTO alumno_tutor VALUES ('2020113333', 'T002', 'TUT05');
INSERT INTO alumno_tutor VALUES ('2020114444', 'T002', 'TUT01');

INSERT INTO alumno_tutor VALUES ('2020115555', 'T003', 'TUT02');
INSERT INTO alumno_tutor VALUES ('2020116666', 'T003', 'TUT03');
INSERT INTO alumno_tutor VALUES ('2020117777', 'T003', 'TUT04');
INSERT INTO alumno_tutor VALUES ('2020118888', 'T003', 'TUT02');
INSERT INTO alumno_tutor VALUES ('2020119999', 'T003', 'TUT03');
INSERT INTO alumno_tutor VALUES ('2020120000', 'T003', 'TUT04');

INSERT INTO alumno_tutor VALUES ('2020121111', 'T004', 'TUT05'); 
INSERT INTO alumno_tutor VALUES ('2020122222', 'T004', 'TUT01');
INSERT INTO alumno_tutor VALUES ('2020123333', 'T004', 'TUT02');
INSERT INTO alumno_tutor VALUES ('2020124444', 'T004', 'TUT05');
INSERT INTO alumno_tutor VALUES ('2020125555', 'T004', 'TUT01');
INSERT INTO alumno_tutor VALUES ('2020126666', 'T004', 'TUT02');

INSERT INTO alumno_tutor VALUES ('2020127777', 'T005', 'TUT03');
INSERT INTO alumno_tutor VALUES ('2020128888', 'T005', 'TUT04');
INSERT INTO alumno_tutor VALUES ('2020129999', 'T005', 'TUT05');
INSERT INTO alumno_tutor VALUES ('2020130000', 'T005', 'TUT03');
INSERT INTO alumno_tutor VALUES ('2020131111', 'T005', 'TUT04');
INSERT INTO alumno_tutor VALUES ('2020132222', 'T005', 'TUT05');

INSERT INTO alumno_tutor VALUES ('2020133333', 'T006', 'TUT01');
INSERT INTO alumno_tutor VALUES ('2020134444', 'T006', 'TUT02');
INSERT INTO alumno_tutor VALUES ('2020135555', 'T006', 'TUT03');
INSERT INTO alumno_tutor VALUES ('2020136666', 'T006', 'TUT01');
INSERT INTO alumno_tutor VALUES ('2020137777', 'T006', 'TUT02');
INSERT INTO alumno_tutor VALUES ('2020138888', 'T006', 'TUT03');

INSERT INTO alumno_tutor VALUES ('2020139999', 'T007', 'TUT04');
INSERT INTO alumno_tutor VALUES ('2020140000', 'T007', 'TUT05');
INSERT INTO alumno_tutor VALUES ('2020141111', 'T007', 'TUT01');
INSERT INTO alumno_tutor VALUES ('2020143333', 'T007', 'TUT04');
INSERT INTO alumno_tutor VALUES ('2020142222', 'T007', 'TUT05');

INSERT INTO alumno_tutor VALUES ('2020144444', 'T008', 'TUT03');
INSERT INTO alumno_tutor VALUES ('2020145555', 'T008', 'TUT04');
INSERT INTO alumno_tutor VALUES ('2020146666', 'T008', 'TUT02');
INSERT INTO alumno_tutor VALUES ('2020147777', 'T008', 'TUT03');

INSERT INTO alumno_tutor VALUES ('2020148888', 'T009', 'TUT05');
INSERT INTO alumno_tutor VALUES ('2020149999', 'T009', 'TUT01');
INSERT INTO alumno_tutor VALUES ('2020150000', 'T009', 'TUT02');

DELIMITER //
CREATE PROCEDURE VerTutoradosPorID(IN idTutorParam VARCHAR(10))
BEGIN
    SELECT 
        t.nombre AS NombreTutor, 
        tut.nombreTutoria AS TipoTutoria,
        COUNT(at.boleta) AS NumeroTutorados
    FROM tutor t
    JOIN tutor_tutoria tt ON t.idTutor = tt.idTutor
    JOIN tutoria tut ON tt.idTutoria = tut.idTutoria
    LEFT JOIN alumno_tutor at ON t.idTutor = at.idTutor AND tut.idTutoria = at.idTutoria
    WHERE t.idTutor = idTutorParam
    GROUP BY t.idTutor, tut.idTutoria;
END //

DELIMITER ;

SELECT t.idTutor, t.nombre, t.numAlumnos FROM tutor t WHERE t.numAlumnos < 15