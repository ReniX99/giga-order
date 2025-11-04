import { Test } from '@nestjs/testing';
import { UsersInfoService } from './users-info.service';
import { UsersInfoRepository } from './users-info.repository';
import { RpcException } from '@nestjs/microservices';
import {
  fullUserInfo,
  fullUsersInfoDto,
  shortUserInfoDto,
  updatedUserInfo,
  updatedUserInfoDto,
  userId,
  userInfo,
  userInfoDto,
  userInfoQuery,
  userInfoWithEmail,
  userInfoWithRoles,
} from './test-data';

describe('Users Info Service', () => {
  let usersInfoService: UsersInfoService;
  const mockUsersInfoRepository = {
    getAll: jest.fn().mockResolvedValue(fullUserInfo),
    findWithRolesById: jest.fn().mockResolvedValue(userInfoWithRoles),
    findWithEmailById: jest.fn().mockResolvedValue(userInfoWithEmail),
    findById: jest.fn().mockResolvedValue(userInfo),
    updateById: jest.fn().mockResolvedValue(updatedUserInfo),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersInfoService,
        {
          provide: UsersInfoRepository,
          useValue: mockUsersInfoRepository,
        },
      ],
    }).compile();

    usersInfoService = module.get<UsersInfoService>(UsersInfoService);
  });

  it('should be defined', () => {
    expect(usersInfoService).toBeDefined();
  });

  describe('Is User Null', () => {
    const NotFoundException = new RpcException({
      statusCode: 404,
      message: 'User not found',
    });

    it('should throw a not found exception (404), when get null', () => {
      expect(() => usersInfoService.isUserNull(null)).toThrow(
        NotFoundException,
      );
    });

    it('should throw a not found exception (404), when get undefined', () => {
      expect(() => usersInfoService.isUserNull(undefined)).toThrow(
        NotFoundException,
      );
    });

    it('should not throw a exception, when get not null ', () => {
      expect(() => usersInfoService.isUserNull(userInfo)).not.toThrow();
    });
  });

  describe('Get all users info', () => {
    it('should get all users', async () => {
      const result = await usersInfoService.getAll(userInfoQuery);

      expect(result).toEqual(fullUsersInfoDto);
    });
  });

  describe('Get user info with roles', () => {
    it('should get user with roles', async () => {
      const result = await usersInfoService.getWithRolesById(userId);

      expect(result).toEqual(userInfoWithRoles);
    });
  });

  describe('Get user info with email', () => {
    it('should get user with email', async () => {
      const result = await usersInfoService.getWithEmailById(userId);

      expect(result).toEqual(userInfoDto);
    });
  });

  describe('Update user info', () => {
    it('should update user info', async () => {
      const result = await usersInfoService.updateById(
        userId,
        updatedUserInfoDto,
      );

      expect(result).toEqual(shortUserInfoDto);
    });
  });
});
