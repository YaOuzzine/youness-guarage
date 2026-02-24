import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1771887326188 implements MigrationInterface {
    name = 'InitialSchema1771887326188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "guestName" character varying(255) NOT NULL, "guestEmail" character varying(255) NOT NULL, "guestPhone" character varying(32) NOT NULL, "licensePlate" character varying(32) NOT NULL, "vehicleMake" character varying(128) NOT NULL, "vehicleModel" character varying(128) NOT NULL, "checkIn" TIMESTAMP WITH TIME ZONE NOT NULL, "checkOut" TIMESTAMP WITH TIME ZONE NOT NULL, "spotNumber" integer, "status" character varying(32) NOT NULL DEFAULT 'PENDING', "totalPrice" numeric(10,2) NOT NULL, "stripePaymentIntentId" character varying(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addon" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookingId" uuid NOT NULL, "type" character varying(32) NOT NULL, "status" character varying(32) NOT NULL DEFAULT 'PENDING', "price" numeric(10,2) NOT NULL, "notes" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a9d1f873ee73b39492b03f2a566" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parking_spot" ("id" SERIAL NOT NULL, "label" character varying(16) NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "type" character varying(16) NOT NULL DEFAULT 'STANDARD', CONSTRAINT "UQ_f47710380426b21de6f4c673fd1" UNIQUE ("label"), CONSTRAINT "PK_15bcb502057157741cff7a11ece" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addon" ADD CONSTRAINT "FK_ac59480a37b120fcb21549e1b67" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addon" DROP CONSTRAINT "FK_ac59480a37b120fcb21549e1b67"`);
        await queryRunner.query(`DROP TABLE "parking_spot"`);
        await queryRunner.query(`DROP TABLE "addon"`);
        await queryRunner.query(`DROP TABLE "booking"`);
    }

}
