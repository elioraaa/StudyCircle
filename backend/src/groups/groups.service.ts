import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepo: Repository<Group>,
  ) {}

  create(dto: CreateGroupDto) {
    const group = this.groupsRepo.create(dto);
    return this.groupsRepo.save(group);
  }

  findAll() {
    return this.groupsRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const group = await this.groupsRepo.findOne({ where: { id } });
    if (!group) throw new NotFoundException(`Group ${id} not found`);
    return group;
  }

  async update(id: number, dto: UpdateGroupDto) {
    await this.findOne(id);
    await this.groupsRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.groupsRepo.delete(id);
    return { deleted: true };
  }
}