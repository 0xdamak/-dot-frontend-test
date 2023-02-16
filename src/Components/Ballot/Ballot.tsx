import { useState } from "react";
import { INominee, ISelection } from "models";
import Nominee from "Components/Nominee";
import styles from "./Ballot.module.scss";

type Props = {
  id: string;
  index: number;
  title: string;
  nominees: INominee[];
  getSelection: ({ category, nominee }: ISelection) => void;
};

export default function Ballot({
  id,
  index,
  nominees,
  title,
  getSelection,
}: Props) {
  const [selectedNominee, setSelectedNominee] = useState<INominee | null>(null);

  function handler(nominee: INominee) {
    setSelectedNominee(nominee);
    getSelection({
      category: {
        id,
        title,
      },
      nominee,
    });
  }

  return (
    <section className={styles.container}>
      <header>
        <h1>{title}</h1>
      </header>
      <div>
        {nominees.map((datum) => (
          <Nominee
            selectedNominee={selectedNominee}
            selectNominee={(nominee) => handler(nominee)}
            key={datum.id}
            nominee={datum}
          />
        ))}
      </div>
    </section>
  );
}
