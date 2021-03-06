import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import { Parcours } from '../model/models';
import { Response } from 'express';
import { getRepository, Repository, Like, FindManyOptions } from 'typeorm';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@JsonController('/parcours')
// @UseBefore(JwtMiddleware)
export class ParcoursController {

  private service = getRepository(Parcours);


  @Get('/getAll/:startIndex/:pageSize/:filter?')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize, @Param('filter') filter: string, @Res() response: Response) {
    const opts = {
      skip: startIndex,
      take: pageSize,
      relations: ['user'],
      where: { titre: Like(`%${filter === '*' ? '' : filter}%`) },
      order: { id: 'DESC' }
    }

    return await this.service.findAndCount(opts as any);
  }

  // @UseBefore(JwtMiddleware)
  // @Get('/getFollowed/:startIndex/:pageSize/:idUser/:filter')
  // async getFollowed(@Param('startIndex') startIndex, @Param('pageSize') 
  // pageSize, @Param('idUser') idUser, @Param('filter') filter: string, @Res() response: Response) {

  //   const userId = response.locals.jwtPayload.userId as number;

  //   let opts = {
  //     skip: startIndex,
  //     take: pageSize,
  //     relations: ['user'],
  //     join: { alias: 'parcours', innerJoin: { v: 'parcours.userParcoursVisites' } },


  //     where: qb => {
  //       qb.where({  titre: Like(`%${filter === '*' ? '' : filter}%`)})
  //         .andWhere('v.userId = :userId', { userId: idUser });
  //     }
  //   }

  //   return await this.service.findAndCount(opts);
  // }

  @UseBefore(JwtMiddleware)
  @Get('/getCreated/:startIndex/:pageSize/:idUser/:filter')
  async getCreated(@Param('startIndex') startIndex, @Param('pageSize') pageSize
    , @Param('idUser') idUser, @Param('filter') filter: string, @Res() response: Response) {

    const userId = response.locals.jwtPayload.userId as number;

    let opts = {
      skip: startIndex,
      take: pageSize,
      relations: ['user'],
      where: { userId: idUser, titre: Like(`%${filter === '*' ? '' : filter}%`) },
    }

    return await this.service.findAndCount(opts);
  }

  @Post('/post')
  async post(@Body() model: Parcours) {
    return await this.service.save(model);
  }

  @Put('/put/:id')
  async put(@Param('id') id: number, @Body() model: Parcours) {
    return await this.service.update(id, model);
  }

  @UseBefore(JwtMiddleware)
  @Get('/get/:id')
  async get(@Param('id') id: number, @Res() response: Response) {

    const userId = response.locals.jwtPayload.userId as number;

    const p2 = await this.service.createQueryBuilder('p')
      .leftJoinAndSelect("p.user", "user")
      .leftJoinAndSelect("p.etaps", "etap")
      .leftJoinAndSelect("etap.quizzs", "quizz")
      .leftJoinAndSelect("quizz.reponses", "reponse", "reponse.userId = :userId", { userId: userId })
      .where("p.id = :id", { id: id })
      // .andWhere("reponse.userId = :userId", { userId: 100 })
      .getOne()
      ;

    return p2;
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }

}
