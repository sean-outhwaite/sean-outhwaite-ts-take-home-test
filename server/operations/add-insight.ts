import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";
import { insertStatement } from "$tables/insights.ts";

type Input = HasDBClient & insightsTable.Insert;

export default (input: Input): number | undefined => {
  console.log(`Creating insight`);
  const db = input.db;

  const insertStmt = insertStatement(input);
  const result = db.exec(insertStmt);
  console.log("Insight created:", result);
  return result;
};
