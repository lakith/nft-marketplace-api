import express from 'express';
import cors from 'cors';
import connectDB from './database/mongoConfig';
import routes from './routes';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';
import passport from 'passport'
import passportJWT from './config/passport/passport'

const app = express();

app.use(cors());
connectDB();

passportJWT(passport)
app.use(passport.initialize());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const PORT: string | number = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: true }));
// request payload middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
