import "./App.css";
import useUrlState from "./useUrlState";

const languages = ["React", "Svelte", "Visual Basic"];

const animals = ["Cat", "Dog", "Rock"];

function App() {
  const [urlState, setUrlState] = useUrlState();

  const { company = "React", pet = "Cat" } = urlState;

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
      <header className="App-header">
        <div>
          {languages.map((lang) => (
            <button key={lang} onClick={() => setCompany(lang)}>
              {lang}
            </button>
          ))}
          <a className="App-link" href="/">
            {company}
          </a>
        </div>
        <div>
          {animals.map((animal) => (
            <button key={animal} onClick={() => setPet(animal)}>
              {animal}
            </button>
          ))}
          <button onClick={() => setPet(null)}>Clear</button>
          <a className="App-link" href="/">
            {pet}
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
