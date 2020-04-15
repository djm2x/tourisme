import { JsonController, Param, Body, Get, Post, Put, Delete, NotFoundError, UseBefore } from 'routing-controllers';

@JsonController('/home')
// @UseBefore(JwtMiddleware)
export class HomeController {


  @Get('/list')
  list() {
    return {
      bnr1:"2464068867179663_2495149740738242",
      bnr2:"2464068867179663_2495149934071556",
      inter1:"2464068867179663_2495150220738194",
      inter2:"2464068867179663_2495150424071507"
    };
  }

  @Get('/listPromise')
  async listPromise() {

    const UnitAds = {
      bnr1:"2464068867179663_2495149740738242",
      bnr2:"2464068867179663_2495149934071556",
      inter1:"2464068867179663_2495150220738194",
      inter2:"2464068867179663_2495150424071507"
    }
    
    return  await new Promise((res, rej) => res(UnitAds));
  }

}
