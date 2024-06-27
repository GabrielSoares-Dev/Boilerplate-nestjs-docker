import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@infra/modules/app.module';
import { HttpStatus } from '@nestjs/common';
import { create } from '@test/helpers/db/factories/role.factory';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@domain/enums/role.enum';
import * as request from 'supertest';

const path = '/v1/role';

const input = {
  name: faker.lorem.word(),
  description: 'test',
};

const userLogged = {
  id: 1,
  name: 'test',
  email: 'test@gmail.com',
  phoneNumber: '11991742156',
  role: Role.ADMIN,
  permissions: ['test'],
};

describe('Update role', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    app.enableVersioning();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    const tokenGenerated = await jwtService.signAsync(userLogged);
    token = `Bearer ${tokenGenerated}`;
  });

  it('Should be update role with success', async () => {
    const roleCreatedBefore = await create();
    const id = roleCreatedBefore.id;

    const expectedStatusCode = HttpStatus.OK;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Role Updated successfully',
    };

    return request(app.getHttpServer())
      .patch(`${path}/${id}`)
      .send(input)
      .set({ Authorization: token })
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be is invalid id', async () => {
    const id = faker.number.int({ max: 100 });
    const expectedStatusCode = HttpStatus.BAD_REQUEST;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Invalid id',
    };

    return request(app.getHttpServer())
      .patch(`${path}/${id}`)
      .send(input)
      .set({ Authorization: token })
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be failure with wrong input fields', async () => {
    const input = {
      name: 2,
      description: 2,
    };
    const expectedStatusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    const expectedResponse = {
      message: ['name must be a string', 'description must be a string'],
      error: 'Unprocessable Entity',
      statusCode: expectedStatusCode,
    };

    const id = 3;
    return request(app.getHttpServer())
      .patch(`${path}/${id}`)
      .send(input)
      .set({ Authorization: token })
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be failure with wrong params fields', async () => {
    const expectedStatusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    const expectedResponse = {
      message: ['id must be a number string'],
      error: 'Unprocessable Entity',
      statusCode: expectedStatusCode,
    };

    const id = 'test';
    return request(app.getHttpServer())
      .patch(`${path}/${id}`)
      .send(input)
      .set({ Authorization: token })
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be is unauthorized', () => {
    const id = faker.number.int({ max: 100 });
    const expectedStatusCode = HttpStatus.UNAUTHORIZED;
    const expectedResponse = {
      message: 'Unauthorized',
      statusCode: expectedStatusCode,
    };

    return request(app.getHttpServer())
      .patch(`${path}/${id}`)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
