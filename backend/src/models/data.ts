import { FieldInfo } from 'mysql';

export interface DbResult {
  results: Array<unknown>;
  fields: FieldInfo[] | undefined;
}
