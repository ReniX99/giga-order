import { Test } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UsersInfoService } from '../users-info/users-info.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import {
  createUserDto,
  jwtPayload,
  jwtResponse,
  loginRequestDto,
  loginResponseDto,
  token,
  user,
  userIdDto,
  userWithRoles,
} from './test-data';
import { LoginRequestDto } from '@app/contracts/users/auth/dto';

describe('Auth Serivice', () => {
  let authService: AuthService;
  const mockUsersService = {
    create: jest.fn().mockResolvedValue(userIdDto),
    getByEmail: jest.fn().mockResolvedValue(user),
  };
  const mockUsersInfoService = {
    getWithRolesById: jest.fn().mockResolvedValue(userWithRoles),
  };
  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue(token),
  };
  const mockConfigService = {
    getOrThrow: jest.fn((key: string) => {
      const values: Record<string, string> = {
        TOKEN_TLL: '7d',
      };

      return values[key];
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: UsersInfoService,
          useValue: mockUsersInfoService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Register user', () => {
    it('should return id of created user', async () => {
      const result = await authService.register(createUserDto);

      expect(result).toEqual(userIdDto);
    });

    it('should throw a bad gateway exception (400), when user with same email exists', async () => {
      const BadGatewayRcpException = new RpcException({
        statusCode: 400,
        message: 'User with same email exists',
      });

      mockUsersService.create.mockRejectedValue(BadGatewayRcpException);

      const result = authService.register(createUserDto);
      await expect(result).rejects.toThrow(BadGatewayRcpException);
    });
  });

  describe('Login user', () => {
    it('should return userId and jwt token', async () => {
      const result = await authService.login(loginRequestDto);

      expect(result).toEqual(loginResponseDto);
    });

    const BadGatewayRcpException = new RpcException({
      statusCode: 400,
      message: 'Wrong email or password',
    });

    it('should throw a bad gateway exception (400), when email is not existed', async () => {
      mockUsersService.getByEmail.mockRejectedValue(BadGatewayRcpException);

      const result = authService.login(loginRequestDto);
      await expect(result).rejects.toThrow(BadGatewayRcpException);
    });

    it('should throw a bad gateway exception (400), when password does not match entered password', async () => {
      const wrongLoginRequestDto: LoginRequestDto = {
        ...loginRequestDto,
        password: '1234567',
      };

      const result = authService.login(wrongLoginRequestDto);
      await expect(result).rejects.toThrow(BadGatewayRcpException);
    });
  });

  describe('Validate Token', () => {
    it('should return jwt response', async () => {
      const result = await authService.validateToken(jwtPayload);

      expect(result).toEqual(jwtResponse);
    });

    it('should throw a not found exception (404), when user not found', async () => {
      const NotFoundException = new RpcException({
        statusCode: 404,
        message: 'User not found',
      });

      mockUsersInfoService.getWithRolesById.mockRejectedValue(
        NotFoundException,
      );

      const result = authService.validateToken(jwtPayload);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
