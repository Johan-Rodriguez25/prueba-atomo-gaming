import { DaoMovieConnector } from "../../infra/connectors/daoMovieConnector";

export class DeleteMovieService {
  constructor(private _daoMovieConnector = new DaoMovieConnector()) {}

  public async DeleteMovieService(id: string) {
    return this._daoMovieConnector.deleteMovie(id);
  }
}
