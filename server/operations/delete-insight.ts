import type { HasDBClient } from "../shared.ts";
import { deleteStatement } from "$tables/insights.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): number | undefined => {
  console.log(`Deleting insight`);
  const db = input.db;

  const deleteStmt = deleteStatement(input);
  const result = db.exec(deleteStmt);
  console.log("Insight deleted:", result);
  return result;
};
