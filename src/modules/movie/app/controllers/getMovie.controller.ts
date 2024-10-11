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

  public async getMoviesByCategory(req: Request, res: Response) {
    try {
      const { body } = req;
      const { categorias, sort, skip, limit } = body;
      const result = await this.getMovieService.getMoviesByCategory(
        categorias,
        sort,
        skip,
        limit
      );

      return this.responseExpress.successResponse(res, result);
    } catch (error) {
      return this.responseExpress.errorResponse(res, error as Error);
    }
  }

  public async getMoviesByRating(req: Request, res: Response) {
    try {
      const { body } = req;
      const { rating, skip, limit } = body;
      const result = await this.getMovieService.getMoviesByRating(
        rating,
        skip,
        limit
      );

      return this.responseExpress.successResponse(res, result);
    } catch (error) {
      return this.responseExpress.errorResponse(res, error as Error);
    }
  }

  public async getAllMovies(req: Request, res: Response) {
    try {
      const { body } = req;
      const { sort, skip, limit } = body;
      const result = await this.getMovieService.getAllMovies(sort, skip, limit);

      return this.responseExpress.successResponse(res, result);
    } catch (error) {
      return this.responseExpress.errorResponse(res, error as Error);
    }
  }
}

export default GetMovieController;
