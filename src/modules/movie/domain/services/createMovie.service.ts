import { Movie } from "../models/mdl-movie";
import { DaoMovieConnector } from "../../infra/connectors/daoMovieConnector";
import { SchemaValidatorAdapter } from "../../../../common/adapters/schemaValidatorAdapter";
import { MovieSchema } from "../models/movieSchema";

export class CreateMovieService {
  public async createMovie(movie: Movie) {
    try {
      const schemaValidatorAdapter = new SchemaValidatorAdapter();
      schemaValidatorAdapter.compileSchema(MovieSchema);
      schemaValidatorAdapter.verifySchema(movie);
      const daoMovieConnector = new DaoMovieConnector();
      const result = await daoMovieConnector.createMovie(movie);

      return result;
    } catch (error) {
      const _error = error as Error;

      return _error;
    }
  }
}
