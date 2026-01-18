import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const addInsight = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const brand = String(formData.get("brand") ?? "0");
    const text = String(formData.get("text") ?? "");

    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/insights", {
        method: "POST",
        body: JSON.stringify({
          brand,
          text,
          createdAt: String(Date.now()),
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to add insight: ${response.statusText}`);
      }
      globalThis.dispatchEvent(new CustomEvent("insight:created"));
      props.onClose();
    } catch (err) {
      console.error("Failed to add insight:", err);
    }
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={(e) => addInsight(e)}>
        <label className={styles.field}>
          <select name="brand" className={styles["field-input"]}>
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            name="text"
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            required
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
