import express, { Application } from "express";

import compression from "compression";
import cors from "cors";
import dotenvFlow from "dotenv-flow";
import morgan from "morgan";
import helmet from "helmet";
import { Observable, catchError, firstValueFrom, of } from "rxjs";

import MongoReadConnection from "../../../common/config/configMongoReadConnection";
import MongoWriteConnection from "../../../common/config/configMongoWriteConnection";
import { ParalellQueueAdapter } from "../../../common/adapters/paralellQueueAdapter";

import { MovieRoutes } from "../../movie/infra/http/apiMovie.routes";

dotenvFlow.config({
  silent: true,
});

class Server {
  private port: number;
  public static instance: Server;
  public app: Application;
  public MongoReadConnection!: MongoReadConnection;
  public MongoWriteConnection!: MongoWriteConnection;
  private apiPath = {
    movies: "/v1/api/movies",
  };

  private constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3001;
    this.init();
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }

    return Server.instance;
  }

  private async init(): Promise<void> {
    try {
      this.MongoReadConnection = MongoReadConnection.getInstance();
      this.MongoWriteConnection = MongoWriteConnection.getInstance();
      this.listenStatusConnection();
    } catch (error) {
      console.log(error);
    }
  }

  private async listenStatusConnection() {
    try {
      const mongoConnections: Observable<boolean | undefined>[] = [];
      mongoConnections.push(
        this.MongoReadConnection.statusConnection.pipe(
          catchError((error) => {
            console.error("Error in MongoDB Read Connection:", error);
            return of(false);
          })
        )
      );
      mongoConnections.push(
        this.MongoWriteConnection.statusConnection.pipe(
          catchError((error) => {
            console.error("Error in MongoDB Write Connection:", error);
            return of(false); // Emitir 'false' en caso de error
          })
        )
      );
      const paralellQueueAdapter = new ParalellQueueAdapter(
        mongoConnections,
        20,
        20000
      );
      paralellQueueAdapter.execute();
      await firstValueFrom(paralellQueueAdapter.statusFinishTasks);
      this.middlewares();
      this.routes();
      this.listen();
    } catch (error) {
      throw new Error("Error en la conexión de la db");
    }
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(
      express.urlencoded({
        limit: "6mb",
        extended: true,
        parameterLimit: 60000,
      })
    );
    this.app.use(express.json({ limit: "6mb" }));
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(compression({ level: 9 }));
  }

  private routes(): void {
    this.app.use(this.apiPath.movies, MovieRoutes.routes);
    this.app.get("/", (req: any, res: any) =>
      res.status(200).json({ ok: true })
    );
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en ${this.port}`);
    });
  }
}

export default Server;
