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

* Prisma hat nen ganz coolen editor für database. Man startet den mit: `npx prisma studio`

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
  * dev mit mit watch für file changes startet man mit: `npm run start:dev`

Auch `swagger` installieren für api dokumentation mit `npm i @nestjs/swagger`
`main.ts` configured with swagger
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Flower auf Dauer Backend')
    .setDescription(
      'Backend in NestJS and Prisma Diploma Thesis for Flower Auf Dauer',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

Also Objects doch umsonst gemacht de types gibts von Prisma in `@prisma/client` 

Ok hier mal vorgang beschreiben wie die `sensors`-Route implementiert wird:
1. Zuerste `nest g resource sensors`
   1. Optionsauswahl:
   2. `What transport layer do you use? REST API`
   3. `Would you like to generate CRUD entry points? Yes`
2. Dies erstellt im Ordner `src` einen neuen Ordner namens `sensors` als `src/sensors`
   1. Dieser Ordner enthält einen Ordner namens `dto` DTO steht für `Data Transfer Object`
      1. In diesem Ordner befinden sich 2 dateien einemal `update-sensor.dto.ts` & `create-sensor.dto.ts`
         1. im create-sensor.dto.ts File:
            1. Hier verwende ich wieder implements um die ganzen Eigenschaften zu generieren, entferne danach aber wieder die id und implements
            2. Danach füge ich über jeder Eigenschaft `@ApiProperty()` hinzu und validierungsfelder wie @IsNotEmpty, @IsString, @IsLatitude, etc...
         2. Im updateSensor nichts machen
   2. Dann gibt es einen Ordner namens `entities`. Dieser enthält eine Klasse namens `Sensor`. 
      1. Diese müssen wir in SensorEntity umbenenen und wir implementieren den von Prisma erstellten typ Sensor mithilfe von `implements`.
      2. Also `export class Sensor {}` -> `export class SensorEntity implements Sensor {}`
      3. Danach wird `SensorEntity` rot unterwellt. In VSCode mit `Strg + .` drauf gehen und autocomplete verwenden um die Objekteigenschaften zu implementieren. In diesem Fall `id: string; type: SensorType; fieldId: string;` Nun wird für die Dokumentation Swagger support hinzugefügt und zwar wird über jedem Feld `@ApiProperty()` hinzugefügt. Damit wird in der Doku localhost:3000/api unter schemas die Felder dokumentiert.
   3. `sensors.controller.ts` ist die Controller Datei. Diese führt je nach eingeheder Request eine function der `sensors.service.ts` Datei aus. 
      1. Ganz Oben unter @Controller('sensors'), @ApiTags('sensors') einfügen, damit dies die Überschrift bei swagger ist.
      2. Unter @Post() und @Patch() den folgenden Tag hinzufügen: `@ApiCreatedResponse({ type: SensorEntity })` 
      3. Unter den anderen ist es `@ApiOkResponse({ type: SensorEntity })` und hier gibt es noch die Option bei zum Beispiel getAll() die eigenschaft `isArray: true` hinzuzufügen.
   4. Im `sensors.module.ts` File muss man nichts tun
   5. `sensors.service.ts` prisma client importieren und dann überall mit prisma.field.**** die methoden einfüllen
   6. Danach sollte alles klappen, falls eine Route nicht hinzugefügt wird und nicht auffindbar ist, dann `yarn build` und nochmals starten mit `yarn run start:dev`

TODO: error handling in `**/services.ts` files implementieren
TODO: bei sensor und sensorValue überprüfen, ob das Feld bzw der Sensor existiert sprich
bei sensor die fieldId muss existieren ansonsten NOT_FOUND_ERROR
bei sensorValue die sensorId muss existieren ansonsten NOT_FOUND_ERROR
TODO: Errorvalidation: checken was passiert wenn man bei PATCH einen parameter übergibt, den es nicht gibt, beispiel sensor hat 2 werte type und fieldId. Was passiert wenn ich { "dogname": "herman" } oder sowas übergebe

# validierung
https://docs.nestjs.com/techniques/validation
Validierung wird glaub ich doch mit class-validator und class-transformer umgesetzt grad noch am testen

adding `id: string;` to every `create-<object>.dto.ts` file with @IsUUID() and @IsOptionl()
I do this because let's say database got deleted and now i need to insert the backup via the api, then I also need to be able to pass
everything with the id. So that the userId on the field object for example still is the same 

Jetzt fehlt nur noch die authentifizierung mit jwt!

# authentification
`https://docs.nestjs.com/security/authentication`



Danach wärs das fürs erste vom backend. Da nit alzu weit voraus geplant wurde. Die aktuellen Anforderung sind erfüllt! Im nächsten Schritt wird diese Branch mit der main gemerged und dann eine neue erstellt, die sich um das frontend kümmert