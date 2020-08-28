import { readFileSync } from 'fs';

export default readFileSync(`${__dirname}/schema.graphqls`, 'utf8');
