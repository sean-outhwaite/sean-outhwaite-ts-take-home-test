import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
};

export const Insights = ({ insights, className }: InsightsProps) => {
  const deleteInsight = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/insights/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete insight: ${response.statusText}`);
      }
      globalThis.dispatchEvent(new CustomEvent("insight:created"));
    } catch (err) {
      console.error("Failed to delete insight:", err);
    }
  };

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length
          ? (
            insights.map(({ id, text, date, brandId }) => (
              <div className={styles.insight} key={id}>
                <div className={styles["insight-meta"]}>
                  <span>{brandId}</span>
                  <div className={styles["insight-meta-details"]}>
                    <span>{new Date(Number(date)).toLocaleString()}</span>
                    <Trash2Icon
                      className={styles["insight-delete"]}
                      onClick={() =>
                        deleteInsight(String(id))}
                    />
                  </div>
                </div>
                <p className={styles["insight-content"]}>{text}</p>
              </div>
            ))
          )
          : <p>We have no insight!</p>}
      </div>
    </div>
  );
};
