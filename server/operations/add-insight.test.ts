import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import lookupInsight from "./lookup-insight.ts";
import addInsight from "./add-insight.ts";

describe("listing insights in the database", () => {
  describe("specified insight not in the DB", () => {
    withDB((fixture) => {
      let result: Insight | undefined;

      beforeAll(() => {
        result = lookupInsight({ ...fixture, id: 0 });
      });

      it("returns nothing", () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe("insight is in the DB", () => {
    withDB((fixture) => {
      const insights: Insight[] = [
        { id: 1, brand: 0, createdAt: new Date(), text: "1" },
        { id: 2, brand: 0, createdAt: new Date(), text: "2" },
        { id: 3, brand: 1, createdAt: new Date(), text: "3" },
        { id: 4, brand: 4, createdAt: new Date(), text: "4" },
      ];

      let result: Insight | undefined;

      beforeAll(() => {
        fixture.insights.insert(
          insights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );
        result = lookupInsight({ ...fixture, id: 3 });
      });

      it("returns the expected insight", () => {
        expect(result).toEqual(insights[2]);
      });
    });
  });

  describe("adding a new insight", () => {
    withDB((fixture) => {
      let insertedId: number | undefined;
      let retrievedInsight: Insight | undefined;

      const newInsight: Omit<Insight, "id"> = {
        brand: 2,
        createdAt: new Date(),
        text: "This is a new insight",
      };

      beforeAll(() => {
        insertedId = addInsight({
          ...fixture,
          brand: newInsight.brand,
          createdAt: newInsight.createdAt.toISOString(),
          text: newInsight.text,
        });
        if (insertedId !== undefined) {
          retrievedInsight = lookupInsight({ ...fixture, id: insertedId });
        }
      });
      it("inserts and retrieves the new insight correctly", () => {
        expect(insertedId).toBeDefined();
        expect(retrievedInsight).toEqual({
          id: insertedId!,
          ...newInsight,
        });
      });
    });
  });
});
