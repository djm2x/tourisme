import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import { UserParcoursVisite } from '../model/models';
import { Response } from 'express';
import { getRepository, Repository, Like, FindManyOptions } from 'typeorm';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@JsonController('/userParcoursVisites')
@UseBefore(JwtMiddleware)
export class UserParcoursVisitesController {

  private service = getRepository(UserParcoursVisite);

  @UseBefore(JwtMiddleware)
  @Get('/getFollowed/:startIndex/:pageSize/:idUser/:filter')
  async getFollowed(@Param('startIndex') startIndex, @Param('pageSize')
  pageSize, @Param('idUser') idUser, @Param('filter') filter: string, @Res() response: Response) {

    const userId = response.locals.jwtPayload.userId as number;

    // let opts = {
    //   skip: startIndex,
    //   take: pageSize,
    //   relations: ['user'],
    //   join: { alias: 'parcours', innerJoin: { v: 'parcours.userParcoursVisites' } },


    //   where: qb => {
    //     qb.where({ titre: Like(`%${filter === '*' ? '' : filter}%`) })
    //       .andWhere('v.userId = :userId', { userId: idUser });
    //   }
    // }

    const p2 = await this.service.createQueryBuilder('p')
      .where("p.userId = :id", { id: idUser })
      .leftJoinAndSelect("p.parcours", "parcours", "parcours.titre like :filter", { filter: `%${filter === '*' ? '' : filter}%` })
      .skip(startIndex)
      .take(pageSize)
      .leftJoinAndSelect("parcours.user", "user")
      // .leftJoinAndSelect("parcours", "parcours")
      // .andWhere("reponse.userId = :userId", { userId: 100 })
      .getManyAndCount()
      ;

    return p2;

    // return await this.service.findAndCount(opts);
  }

  @Post('/post')
  async post(@Body() model: UserParcoursVisite) {
    try {
      return await this.service.save(model);
    } catch (error) {
      return model;
    }
  }

  @Delete('/delete/:idUser/:idParcours')
  async delete(@Param('idUser') idUser: number, @Param('idParcours') idParcours: number) {

    return await this.service.createQueryBuilder()
      .delete()
      // .from(UserParcoursVisite)
      .where("userId = :idUser and parcoursId = :idParcours", { idUser, idParcours })
      .execute()
      ;
  }
}
