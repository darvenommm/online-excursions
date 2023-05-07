import { Sequelize } from 'sequelize';

import { createExcursions } from './models/excursion.ts';
import { createComments } from './models/comments.ts';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
});

const Excursions = createExcursions(db);
const Comments = createComments(db);

Excursions.hasMany(Comments, {
  foreignKey: 'excursionId',
});
Comments.belongsTo(Excursions, {
  foreignKey: 'excursionId',
});

await db.sync();

export { Excursions, Comments };
