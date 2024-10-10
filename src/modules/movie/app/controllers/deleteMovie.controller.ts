import { Request, Response } from "express";
import ResponseExpress from "../../../../common/adapters/responseExpressAdapter";
import { DeleteMovieService } from "../../domain/services/deleteMovie.service";

class DeleteMovieController {
  constructor(
    private readonly responseExpress = new ResponseExpress(),
    private readonly deleteMovieService = new DeleteMovieService()
  ) {}

  public async deleteMovie(req: Request, res: Response) {
    try {
      const { params } = req;
      const { movieId } = params;
      const result = await this.deleteMovieService.DeleteMovieService(movieId);

      return this.responseExpress.successResponse(res, result);
    } catch (error) {
      return this.responseExpress.errorResponse(res, error as Error);
    }
  }
}

export default DeleteMovieController;
