import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { Coffee } from 'entity/coffee';
import { coffees } from 'entity/seed/coffee';

export class Seed9990000379828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await getRepository(Coffee).save(coffees);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
