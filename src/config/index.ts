type mongoURI = {
  URI: string;
};

export const getMongoUrl = (): mongoURI => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return { URI: 'mongodb+srv://lakith:BolBmtJxo765g8zg@cluster0.m8ptq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' };
    case 'production':
      return { URI: 'mongodb+srv://lakith:BolBmtJxo765g8zg@cluster0.m8ptq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' };
    case 'test':
      return { URI: 'mongodb+srv://lakith:BolBmtJxo765g8zg@cluster0.m8ptq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' };
    default:
      return { URI: 'mongodb+srv://lakith:BolBmtJxo765g8zg@cluster0.m8ptq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' };
  }
};
