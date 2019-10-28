import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1572246450947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `coffee` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `price` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `image` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `coffee`", undefined);
    }

}
