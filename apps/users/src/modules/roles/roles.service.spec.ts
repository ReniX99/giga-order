import { Test } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { RpcException } from '@nestjs/microservices';
import { role, roles, rolesDto } from './test-data';

describe('Roles Service', () => {
  let rolesService: RolesService;
  const mockRolesRepository = {
    findByName: jest.fn().mockResolvedValue(role),
    getAll: jest.fn().mockResolvedValue(roles),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: RolesRepository,
          useValue: mockRolesRepository,
        },
      ],
    }).compile();

    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(rolesService).toBeDefined();
  });

  describe('Is role null', () => {
    const NotFoundException = new RpcException({
      statusCode: 404,
      message: 'Role not found',
    });

    it('should throw a not found exception (404), when get null', () => {
      expect(() => rolesService.isRoleNull(null)).toThrow(NotFoundException);
    });

    it('should throw a not found exception (404), when get undefined', () => {
      expect(() => rolesService.isRoleNull(undefined)).toThrow(
        NotFoundException,
      );
    });

    it('should not throw a exception, when get not null ', () => {
      expect(() => rolesService.isRoleNull(role)).not.toThrow();
    });
  });

  describe('Get Role By Name', () => {
    it('should return role', async () => {
      const roleName = 'Менеджер';
      const result = await rolesService.getByName(roleName);

      expect(result).toEqual(role);
    });
  });

  describe('Get Roles', () => {
    it('should return roles', async () => {
      const result = await rolesService.getAll();

      expect(result).toEqual(rolesDto);
    });
  });
});
