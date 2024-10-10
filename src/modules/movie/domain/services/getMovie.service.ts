import { DaoMovieConnector } from "../../infra/connectors/daoMovieConnector";

export class GetMovieService {
  constructor(private readonly _daoMovieConnector = new DaoMovieConnector()) {}

  public async getMovieById(id: string) {
    const movie = await this._daoMovieConnector.getMovieById(id);

    if (!movie) {
      throw new Error(
        `movie doesn't exists: ${id}, GetMovieService method getMovieById`
      );
    }
    return { movie };
  }

  public async getMoviesByCategory(
    categorias: string[],
    sort: {},
    skip = 0,
    limit = 25
  ): Promise<any> {
    const [result] = await this._daoMovieConnector.getMoviesByCategory(
      categorias,
      sort,
      skip,
      limit
    );

    return result;
  }

  public async getMoviesByRating(
    rating: number,
    skip = 0,
    limit = 25
  ): Promise<any> {
    const [result] = await this._daoMovieConnector.getMoviesByRating(
      rating,
      skip,
      limit
    );

    return result;
  }

  public async getAllMovies(sort: {}, skip = 0, limit = 25): Promise<any> {
    const [result] = await this._daoMovieConnector.getAllMovies(
      sort,
      skip,
      limit
    );

    return result;
  }
}
