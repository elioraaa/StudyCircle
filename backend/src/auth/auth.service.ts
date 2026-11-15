import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('This email is already registered');

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepo.save(this.usersRepo.create({ ...dto, password }));
    return this.buildResponse(user);
  }

  async login(dto: LoginDto) {

    const user = await this.usersRepo.findOne({
      where: { email: dto.email },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Wrong email or password');
    }
    return this.buildResponse(user);
  }

  async me(userId: number) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException();
    return user;
  }

  forgotPassword() {
 
    return { message: 'If an account exists, a reset link has been sent.' };
  }

  private async buildResponse(user: User) {
    const accessToken = await this.jwt.signAsync({ sub: user.id, email: user.email });
    const { password, ...safeUser } = user;
    return { accessToken, user: safeUser };
  }
}