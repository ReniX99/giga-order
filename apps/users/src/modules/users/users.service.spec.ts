import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { RolesService } from '../roles/roles.service';
import {
  createUserDto,
  email,
  role,
  user,
  userId,
  userIdDto,
} from './test-data';
import { RpcException } from '@nestjs/microservices';

describe('Users Serivice', () => {
  let usersSerivce: UsersService;
  const mockUsersRepository = {
    create: jest.fn().mockResolvedValue(user),
    findByEmail: jest.fn().mockResolvedValue(user),
    findById: jest.fn().mockResolvedValue(user),
  };
  const mockRolesService = {
    getByName: jest.fn().mockResolvedValue(role),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    }).compile();

    usersSerivce = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersSerivce).toBeDefined();
  });

  const bodyException = {
    statusCode: 404,
    message: 'User not found',
  };
  const NotFoundRpcException = new RpcException(bodyException);

  describe('Create user', () => {
    it('should create user', async () => {
      mockUsersRepository.findByEmail.mockResolvedValueOnce(undefined);

      const result = await usersSerivce.create(createUserDto);

      expect(result).toEqual(userIdDto);
    });

    it('should throw a bad gateway exception (400), when user with same email exists', async () => {
      const BadGatewayRpcException = new RpcException({
        statusCode: 400,
        message: 'User with same email exists',
      });

      const result = usersSerivce.create(createUserDto);
      await expect(result).rejects.toThrow(BadGatewayRpcException);
    });

    it('should throw a not found exception (404), when role not found', async () => {
      mockUsersRepository.findByEmail.mockResolvedValueOnce(undefined);

      const NotFoundRpcException = new RpcException({
        statusCode: 404,
        message: 'Role not found',
      });

      mockRolesService.getByName.mockRejectedValue(NotFoundRpcException);

      const result = usersSerivce.create(createUserDto);
      await expect(result).rejects.toThrow(NotFoundRpcException);
    });
  });

  describe('Get user by email', () => {
    it('should get user', async () => {
      const result = await usersSerivce.getByEmail(
        email,
        bodyException.statusCode,
        bodyException.message,
      );

      expect(result).toEqual(user);
    });

    it('should throw a not found exception (404), when user not found', async () => {
      mockUsersRepository.findByEmail.mockResolvedValue(undefined);

      const result = usersSerivce.getByEmail(
        email,
        bodyException.statusCode,
        bodyException.message,
      );

      await expect(result).rejects.toThrow(NotFoundRpcException);
    });
  });

  describe('Get user by id', () => {
    it('should get user', async () => {
      const result = await usersSerivce.getById(userId);

      expect(result).toEqual(user);
    });

    it('should throw a not found exception (404), when user not found', async () => {
      mockUsersRepository.findById.mockResolvedValue(undefined);

      const result = usersSerivce.getById(userId);
      await expect(result).rejects.toThrow(NotFoundRpcException);
    });
  });
});
