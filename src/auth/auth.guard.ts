import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Token } from 'src/utils/Token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly Token: Token) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers?.authorization;
    if (!auth) {
      throw new UnauthorizedException(`Please sign in first`);
    }
    const bearer = auth.split(' ')[0];
    const token = auth.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(`Please sign in first`);
    }
    let data: unknown;
    try {
      data = this.Token.verifyAccessToken(token);
    } catch (error) {
      throw new UnauthorizedException(`Please sign in first`);
    }
    if (!data) {
      throw new UnauthorizedException(`Please sign in first`);
    }
    req['user'] = data;
    return true;
  }
}
