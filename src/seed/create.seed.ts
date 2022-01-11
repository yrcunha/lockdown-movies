import * as bcrypt from 'bcrypt';
import { Connection, createConnection } from 'typeorm';
import { SettingEntity } from '../modules/settings/entities/setting.entity';
import { UserEntity } from '../modules/users/entities/user.entity';
import * as seedSettings from './settings.json';
import * as seedUsers from './user.json';

class CreateSeed {
  async createUser() {
    const connection: Connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, SettingEntity],
    });

    const user = connection.getRepository(UserEntity);
    const foundUser = await user.findOne();
    if (!foundUser) {
      for (const key in seedUsers) {
        const encrypted = await bcrypt.hash(seedUsers[key].password, 10);

        Object.assign(seedUsers[key], { password: encrypted });
      }

      const newUser = user.create(seedUsers);
      user.save(newUser);
    }

    const settings = connection.getRepository(SettingEntity);
    const foundSettings = await settings.findOne();
    if (!foundSettings) {
      const newSettings = settings.create(seedSettings);
      settings.save(newSettings);
    }
  }
}

const seed = new CreateSeed();
seed
  .createUser()
  .then(() => {
    console.log('successfully created user and settings');
  })
  .catch((error) => {
    console.log(error.message);
  });
