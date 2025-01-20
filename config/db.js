import mongoose from 'mongoose';

class Database {
  constructor(uri) {
    this.uri = uri;
  }

  async connect() {
    try {
      mongoose.set('strictQuery', false);
      const conn = await mongoose.connect(this.uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
      });

      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error}`);
      process.exit(1); // Exit the process with failure
    }
  }
}

export default Database;