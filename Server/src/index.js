import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { UserRouter } from './Routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/auth', UserRouter);

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://recipeUserName:recipePassword@recipecluster.ho6dtcm.mongodb.net/RecipeCluster?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Port connection
const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.on('error', (error) => {
  console.error('Server error:', error);
});
