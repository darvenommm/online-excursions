import express, { json } from 'express';
import cors from 'cors';
import multer from 'multer';

import { Excursions, Comments } from './database.ts';

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb): void => {
      cb(null, 'pictures');
    },
    filename: (_req, file, cb) => {
      cb(null, `${Math.random()}${file.originalname}`);
    },
  }),
});

const PORT = process.env.PORT ?? 4_000;
const app = express();

app.use(cors(), json());
app.use(express.static('../dist'));
app.use('/pictures', express.static('pictures'));

app.get('/excursions', async (_req, res): Promise<void> => {
  try {
    const excursions = await Excursions.findAll();
    res.status(200).send(
      excursions.map((excursion) => {
        excursion.imageUrl = excursion.imageUrl.replace('\\', '/');
        return excursion;
      }),
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(505);
  }
});

app.post(
  '/excursions',
  upload.single('image'),
  async (req, res): Promise<void> => {
    try {
      await Excursions.create({
        title: req.body.title,
        city: req.body.city,
        description: req.body.description,
        date: req.body.date,
        theme: req.body.theme,
        imageUrl: `${req.file?.path}`,
      });
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
);

app.get('/excursions/:id', async (req, res): Promise<void> => {
  try {
    const id = req.params.id;
    const excursion = await Excursions.findOne({ where: { id } });

    if (!excursion) {
      res.sendStatus(404);
      return;
    }

    excursion.imageUrl = excursion.imageUrl.replace('\\', '/');
    res.send(excursion);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/excursions/:id/comments', async (req, res) => {
  try {
    const id = req.params.id;
    const comments = await Comments.findAll({ where: { excursionId: id } });
    res.status(200).send(comments);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post(
  '/comments',
  upload.single('image'),
  async (req, res): Promise<void> => {
    try {
      await Comments.create({
        body: req.body?.body,
        grade: req.body?.grade,
        imageUrl: `${req.file?.path}`,
        excursionId: req.body?.excursionId,
      });
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
);

app.listen(PORT, () => {
  console.log('Server is ok');
});
