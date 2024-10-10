import { DaoMovieConnector } from "../../infra/connectors/daoMovieConnector";
import { Movie } from "../models/mdl-movie";

export class UpdateMovieService {
  public async updateMovie(id: string, data: Partial<Movie>) {
    const daoMovieConnector = new DaoMovieConnector();
    const result = await daoMovieConnector.updateMovie(id, data);

    return { updated: result };
  }
}
