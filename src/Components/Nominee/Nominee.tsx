import { INominee } from "models";
import styles from "./Nominee.module.scss";

type Props = {
  nominee: INominee;
  selectNominee: ({ id, title, photoUrL }: INominee) => void;
  selectedNominee: INominee | null;
};

export default function Nominee({
  nominee,
  selectNominee,
  selectedNominee,
}: Props) {
  return (
    <div
      className={`${styles.container} ${
        selectedNominee?.id === nominee.id ? styles.selected : ""
      }`}
    >
      <h3>{nominee.title}</h3>
      <img src={nominee.photoUrL} alt={nominee.id} />
      <button onClick={() => selectNominee(nominee)}>Select</button>
    </div>
  );
}
