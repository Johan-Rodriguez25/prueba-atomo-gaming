import { Request, Response } from "express";
import ResponseExpress from "../../../../common/adapters/responseExpressAdapter";
import { CreateMovieService } from "../../domain/services/createMovie.service";

class CreateMovieController {
  constructor(
    private readonly responseExpress = new ResponseExpress(),
    private readonly createMovieService = new CreateMovieService()
  ) {}

  public async createMovie(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await this.createMovieService.createMovie(body);

      return this.responseExpress.successResponse(res, result);
    } catch (error) {
      return this.responseExpress.errorResponse(res, error as Error);
    }
  }
}

export default CreateMovieController;
