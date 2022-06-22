import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';
import cors from 'cors';

// Import routers
import { goalRouter } from './routes/goal.routes';
import { userRouter } from './routes/user.routes';

// Middleware
import { errorHandler } from './middleware/error.middleware';

// Import config to connect with database
import connectDB from './config/db';

// Setup app variable to express function
const app = express();
dotenv.config({ path: __dirname + '../../.env' });

// Setup the string '/api/', so this don't have to be repeated all the time
const API: string = '/api/';
// Setup the port where the backend will be running
const PORT: number = 8000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

// Routers
// Use the app variable to execute the goalRouter
app.use(`${API}goals`, goalRouter);
app.use(`${API}users`, userRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  app.get('*', (_req: Request, res: Response) =>
    res.sendFile(
      path.resolve(__dirname, '../../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/*', (_req: Request, res: Response) =>
    res.send('Please set to production.')
  );
}

// Middleware
app.use(errorHandler);

// Connect with MongoDB
connectDB();

// Run the server
app.listen(PORT, () => {
  console.log(colors.cyan(`Server is running on port: ${PORT}`));
});
