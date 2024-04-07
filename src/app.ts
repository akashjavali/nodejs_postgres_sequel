import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectToDatabase } from '@Database';
import { Logger } from '@Utils';
import dbInit from '@Database/init';
import { router } from '@Routes';

/**
 * Initializes db as soon as server starts running, initially creates tables based on schema created.
 * You can run below func but to prevent conflicts only run bellow if you are ready to start development as this created tables based on your models created and
 * syn'd to PG
 */

//  dbInit();

connectToDatabase();

const PORT = process.env.PORT ?? 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server listing at ${PORT}`);
  Logger.info('g');
});
