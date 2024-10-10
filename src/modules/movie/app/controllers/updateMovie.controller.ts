import { Request, Response } from "express";
import ResponseExpress from "../../../../common/adapters/responseExpressAdapter";
import { UpdateMovieService } from "../../domain/services/updateMovie.service";

class UpdateMovieController {
  constructor(
    private readonly responseExpress = new ResponseExpress(),
    private readonly updateMovieService = new UpdateMovieService()
  ) {}

  public async updateMovie(req: Request, res: Response) {
    try {
      const { body, params } = req;
      const { movieId } = params;

      const result = await this.updateMovieService.updateMovie(movieId, body);

      return this.responseExpress.successResponse(res, result);
    } catch (error) {
      return this.responseExpress.errorResponse(res, error as Error);
    }
  }
}

export default UpdateMovieController;
