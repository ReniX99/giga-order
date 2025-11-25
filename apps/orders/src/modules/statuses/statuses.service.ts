import { Injectable } from '@nestjs/common';
import { Status } from '../prisma/generated/client';
import { StatusesRepository } from './statuses.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class StatusesService {
  constructor(private readonly statusesRepository: StatusesRepository) {}

  async getByName(name: string): Promise<Status> {
    const status = await this.statusesRepository.getByName(name);

    if (!status) {
      throw new RpcException({ statusCode: 404, message: 'Status not found' });
    }

    return status;
  }

  async getById(id: number): Promise<Status> {
    const status = await this.statusesRepository.getById(id);

    if (!status) {
      throw new RpcException({ statusCode: 404, message: 'Status not found' });
    }

    return status;
  }
}
