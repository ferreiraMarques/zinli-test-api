import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/services/user/user.service";
import { Reflector } from '@nestjs/core';


@Injectable()
export class ByRoleGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }

    const { headers } = context.switchToHttp().getRequest();    
    if (!headers.authorization) {
      return false;
    }

    let token = headers.authorization.split('Bearer ')

    try {
      this.jwtService.verify(token[1], {
        publicKey: process.env.KEY,
        ignoreExpiration: true
      });

    } catch (error) {
      console.error(error);
      throw new UnauthorizedException()
    }

    const tokenData: any = this.jwtService.decode(token[1]);    

    if (tokenData != undefined) {
      let user = await this.userService.findById(tokenData.id)
      return await this.matchRole(user.role, requiredRoles)
    }

    throw new UnauthorizedException()
  }

  private async matchRole(userRole: number, permitedRoles: string[]): Promise<boolean> {
    let permited = false
    permitedRoles.forEach(role => {
      if (userRole === parseInt(role)) {
        permited = true
      }
    })
    return permited
  }

}
