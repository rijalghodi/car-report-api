import { DataSource, DataSourceOptions } from 'typeorm';

var dataSourceOptions: DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'development':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
      synchronize: false,
    };
    break;
  case 'test':
    break;
  case 'production':
    break;
  default:
    throw new Error('unknown environment');
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
