import { Router, Request, Response, NextFunction } from "express";
import apicache from "apicache";

import UploadPosterController from "../../app/controllers/uploadPoster.controller";

export class UploadPosterRoutes {
  static get routes(): Router {
    const router = Router();
    apicache.options({
      appendKey: (req: Request) => `${req.url}${JSON.stringify(req.body)}`,
    });

    const _uploadPosterController = new UploadPosterController();

    router.post("/", (req: Request, res: Response, next: NextFunction) => {
      _uploadPosterController.uploadPoster(req, res).catch(next);
    });

    return router;
  }
}
