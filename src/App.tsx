import { useEffect, useState } from "react";
import { IBallot, ISelection } from "models";
import { CheckBadge } from "assets/icons";
import Modal from "Components/UI/Modal";
import Ballot from "Components/Ballot";
import api from "Api/Api";
import styles from "./App.module.scss";

function App() {
  const [data, setData] = useState<IBallot[] | null>(null);
  const [error, setError] = useState(false);
  const [selections, setSelections] = useState<ISelection[] | []>([]);
  const [modalDisplay, setModalDisplay] = useState(false);

  function handleSelections(selection: ISelection) {
    if (selections.length === 0) {
      setSelections([selection]);
      return;
    }
    const categoryExists = selections.find(
      (_selection) => _selection.category.id === selection.category.id
    );
    if (categoryExists) {
      let updatedSelections = [...selections];
      updatedSelections = updatedSelections.map((_selection) => {
        if (_selection.category.id === selection.category.id) {
          return {
            ..._selection,
            nominee: selection.nominee,
          };
        } else {
          return _selection;
        }
      });
      setSelections(updatedSelections);
    }
    if (!categoryExists) {
      setSelections([...selections, selection]);
    }
  }

  function handleSubmit() {
    if (data?.length !== selections.length) {
      alert("Select for all categories!");
      return;
    }
    setModalDisplay(true);
  }

  useEffect(() => {
    api
      .getBallotData()
      .then(({ items }) => setData(items))
      .catch(() => setError(true));
  }, []);

  // Feel free to remove the contents of the header tag to make more room for your code

  return (
    <>
      <main className={styles.container}>
        {!data && !error && <h1>Loading data...</h1>}
        {error && <h1>Oops. An error occurred!😖</h1>}
        {data && (
          <>
            <h2>Golden Globe Awards</h2>
            {data.map((datum, index) => (
              <Ballot
                id={datum.id}
                index={index}
                key={datum.id}
                title={datum.title}
                nominees={datum.items}
                getSelection={(selection) => handleSelections(selection)}
              />
            ))}
          </>
        )}
        <button onClick={handleSubmit}>Submit</button>
      </main>
      <Modal display={modalDisplay} close={() => setModalDisplay(false)}>
        <div className={styles.success}>
          <CheckBadge />
          <h3>Success</h3>
          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan={100} style={{ fontSize: "1.4rem" }}>
                    Your Selections
                  </th>
                </tr>
                <tr>
                  {selections.map((selections) => (
                    <th key={selections.category.id}>
                      {selections.category.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {selections.map((selections) => (
                    <td key={selections.nominee.id}>
                      {selections.nominee?.title}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
