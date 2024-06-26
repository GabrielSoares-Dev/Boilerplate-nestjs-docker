import { Injectable, Inject } from '@nestjs/common';
import { User } from '@domain/entities/user.entity';
import { CreateUserUseCaseInputDto } from '@application/dtos/useCases/user/create.dto';
import {
  LOGGER_SERVICE_TOKEN,
  LoggerServiceInterface,
} from '@application/services/logger.service';
import {
  CRYPTOGRAPHY_SERVICE_TOKEN,
  CryptographyServiceInterface,
} from '@application/services/cryptography.service';
import {
  USER_REPOSITORY_TOKEN,
  UserRepositoryInterface,
} from '@application/repositories/user.repository';
import { BusinessException } from '@application/exceptions/business.exception';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(LOGGER_SERVICE_TOKEN)
    private readonly loggerService: LoggerServiceInterface,

    @Inject(CRYPTOGRAPHY_SERVICE_TOKEN)
    private readonly cryptographyService: CryptographyServiceInterface,

    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  protected validate(input: CreateUserUseCaseInputDto): void {
    const entity = new User(input);

    entity.create();
  }

  async run(input: CreateUserUseCaseInputDto): Promise<void> {
    this.loggerService.info('START CreateUserUseCase');
    this.loggerService.debug('input', input);

    this.validate(input);

    const alreadyExists = await this.userRepository.findByEmail(input.email);
    this.loggerService.debug('alreadyExists', alreadyExists);

    if (alreadyExists) throw new BusinessException('User already exists');

    const encryptedPassword = await this.cryptographyService.encrypt(
      input.password,
    );
    this.loggerService.debug('encryptedPassword', encryptedPassword);

    const created = await this.userRepository.create({
      ...input,
      password: encryptedPassword,
    });
    this.loggerService.debug('created', created);

    this.loggerService.info('FINISH CreateUserUseCase');
  }
}
