import { Router, Request, Response, NextFunction } from "express";
import apicache from "apicache";

import CreateMovieController from "../../app/controllers/createMovie.controller";
import GetMovieController from "../../app/controllers/getMovie.controller";
import UpdateMovieController from "../../app/controllers/updateMovie.controller";
import DeleteMovieController from "../../app/controllers/deleteMovie.controller";

export class MovieRoutes {
  static get routes(): Router {
    const router = Router();
    apicache.options({
      appendKey: (req: Request) => `${req.url}${JSON.stringify(req.body)}`,
    });

    const _createMovieController = new CreateMovieController();
    const _updateMovieController = new UpdateMovieController();
    const _getMovieController = new GetMovieController();
    const _deleteMovieController = new DeleteMovieController();

    router.post(
      "/create",
      (req: Request, res: Response, next: NextFunction) => {
        _createMovieController.createMovie(req, res).catch(next);
      }
    );

    router.get("/all", (req: Request, res: Response, next: NextFunction) => {
      _getMovieController.getAllMovies(req, res).catch(next);
    });

    router.get(
      "/data/:movieId",
      (req: Request, res: Response, next: NextFunction) => {
        _getMovieController.getMovieById(req, res).catch(next);
      }
    );

    router.put(
      "/data/:movieId",
      (req: Request, res: Response, next: NextFunction) => {
        _updateMovieController.updateMovie(req, res).catch(next);
      }
    );

    router.delete(
      "/:movieId",
      (req: Request, res: Response, next: NextFunction) => {
        _deleteMovieController.deleteMovie(req, res).catch(next);
      }
    );

    return router;
  }
}
