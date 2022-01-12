import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({ type: VersioningType.URI });
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(() => app.close());

  describe('POST v1/auth/signup', () => {
    it('user registration validation', () => {
      return request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send({
          username: 'gmail',
          password: 'Admin@1234',
        })
        .expect(201);
    });

    it('data validation', () => {
      return request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send({
          username: 'Ramada',
        })
        .expect(400);
    });

    it('validate if password meets requirements', () => {
      return request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send({
          username: 'Admin',
          password: 'Admin23476',
        })
        .expect(400);
    });

    it('validate if user already exists', () => {
      return request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send({
          username: 'Admin',
          password: 'Admin@123',
        })
        .expect(409);
    });
  });
});
