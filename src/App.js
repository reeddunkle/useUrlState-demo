import "./App.css";
import useUrlState from "./useUrlState";

const languages = ["React", "Svelte", "Visual Basic"];

const animals = ["Cat", "Dog", "Rock"];

function App() {
  const [urlState, setUrlState] = useUrlState();

  const { company = "React", pet = "" } = urlState;

  const setCompany = (comp) => {
    setUrlState({
      company: comp,
    });
  };

  const setPet = (animal) => {
    setUrlState((curState) => ({
      ...curState,
      pet: animal,
    }));
  };

  return (
    <div className="App">
      <div className="grid-container">
        <div className="url-text">{window.location.toString()}</div>
        <div className="language-buttons">
          {languages.map((lang) => (
            <button key={lang} onClick={() => setCompany(lang)}>
              {lang}
            </button>
          ))}
        </div>
        <a className="App-link language-text" href="/">
          {company}
        </a>
        <div className="animal-buttons">
          {animals.map((animal) => (
            <button key={animal} onClick={() => setPet(animal)}>
              {animal}
            </button>
          ))}
          <button onClick={() => setPet(null)}>Clear</button>
        </div>
        <a className="App-link animal-text" href="/">
          {pet}
        </a>
      </div>
    </div>
  );
}

export default App;
