# Diplomarbeit Backend rework with Prisma

IMPORTANT: Die Branch DIPLOMARBEIT-ABSCHLUSS wird NICHT verändert, diese Branch soll auf ewig den Abschlusszustand der ursprünglichen Diplomarbeit enthalten!

In dieser Branch kommt ein Rework der Diplomarbeit zustande. 
Startzustand for rework, database mariaDB, mit Docker und mariadb connector

Dies ist rework nummer 1. Soll das neu erlernte Wissen präsentieren.
Folgender Plan:
Alles nach typescript migrieren!
Datenbankverwaltung mit ORM library Prisma!
Validierung mit Zod!
Dies ist alles was in dieser Branch gemacht werden soll! Weitere Reworks sollen danach folgen und auf dieser Aufbauend sein!

TODO:
1. Migrate all FROM JS -> TS
2. ADD PRISMA WITH ZOD
3. CLEANUP

* Alle Schritte dokumentieren! 


* npm i
* npm audit fix
* npm update, weil paar packages sind veraltet deshalb updaten
* Typescript installieren mit npm i --save-dev typescript ts-node @types/node
* npx tsc --init zum initialisieren von TypeScript
* erstellt Routes/fields.ts und Objects/Field.ts
  * ich glaube ich werde den Ordner Obects löschen und alle Objecte darin in ein Obects.ts Datei reinschreiben
* Prisma hinzugefügt `npm i --save-dev prisma` und Schema file erstellt `npx prisma`, `npx prisma init`
* Datenbank namens `diplomarbeit_backend` erstellt und das Schemafile danach migriert! `npx prisma migrate dev --name init`
* Client initialisieren `npm i @prisma/client` und generieren `npx prisma generate`
* added `zod-prisma` https://github.com/CarterGrimmeisen/zod-prisma#about-the-project. Zod prisma erstellt ts objecte inklusive zod validation lib

In Objects/Field.ts stehengeblieben. Jetzt zuerst herausfinden wie ich das ganze mache und dann umsetzen
* Auf nestjs umsteigen, wegen besserem Errorhandling
  * Nest mit `sudo npm i -g @nestjs/cli` installieren
  * Danach mit `nest new .` im aktuellen projekt hinzufügen die ganzen config files
  * erstellt `/src` und `/test`