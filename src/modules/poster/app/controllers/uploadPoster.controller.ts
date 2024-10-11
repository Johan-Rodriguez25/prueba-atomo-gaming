import { Request, Response } from "express";
import ResponseExpress from "../../../../common/adapters/responseExpressAdapter";
import { UploadPosterService } from "../../domain/services/uploadPoster.service";
import { UploadedFile } from "express-fileupload";

class UploadPosterController {
  constructor(
    private readonly responseExpress = new ResponseExpress(),
    private readonly uploadPosterService = new UploadPosterService()
  ) {}

  public async uploadPoster(req: Request, res: Response) {
    try {
      if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.poster
      ) {
        return this.responseExpress.errorResponse(
          res,
          new Error("No file uploaded or 'poster' file not found.")
        );
      }

      const poster = req.files.poster as UploadedFile;

      if (Array.isArray(poster)) {
        return this.responseExpress.errorResponse(
          res,
          new Error("Multiple files not supported.")
        );
      }

      const result = await this.uploadPosterService.uploadPoster(poster);

      return this.responseExpress.successResponse(res, result);
    } catch (error) {
      return this.responseExpress.errorResponse(res, error as Error);
    }
  }
}

export default UploadPosterController;
