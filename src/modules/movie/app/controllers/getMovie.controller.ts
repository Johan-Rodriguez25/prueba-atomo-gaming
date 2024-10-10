import { Request, Response } from "express";
import ResponseExpress from "../../../../common/adapters/responseExpressAdapter";
import { GetMovieService } from "../../domain/services/getMovie.service";

class GetMovieController {
  constructor(
    private readonly responseExpress = new ResponseExpress(),
    private readonly getMovieService = new GetMovieService()
  ) {}

  public async getMovieById(req: Request, res: Response) {
    try {
      const { params } = req;
      const { movieId } = params;
      const result = await this.getMovieService.getMovieById(movieId);

      return this.responseExpress.successResponse(res, result);
    } catch (error) {
      return this.responseExpress.errorResponse(res, error as Error);
    }
  }

  public async getAllMovies(req: Request, res: Response) {
    try {
      const { body } = req;
      const { sort, limit, skip } = body;
      const result = await this.getMovieService.getAllMovies(sort, limit, skip);

      return this.responseExpress.successResponse(res, result);
    } catch (error) {
      return this.responseExpress.errorResponse(res, error as Error);
    }
  }
}

export default GetMovieController;
