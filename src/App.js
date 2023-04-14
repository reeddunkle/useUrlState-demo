import "./App.css";
import useUrlState from "./useUrlState";

// Util
const noop = () => {};

const Button = ({ children, onClick = noop, ...rest }) => {
  return (
    <button className="button" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

// Data
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
        <div className="input-label">Set</div>
        <div className="output-label">Get</div>
        <div className="language-buttons">
          {languages.map((lang) => (
            <Button key={lang} onClick={() => setCompany(lang)}>
              {lang}
            </Button>
          ))}
          <Button onClick={() => setCompany(null)}>Clear</Button>
        </div>
        <a className="App-link language-text" href="/">
          {company}
        </a>
        <div className="animal-buttons">
          {animals.map((animal) => (
            <Button key={animal} onClick={() => setPet(animal)}>
              {animal}
            </Button>
          ))}
          <Button onClick={() => setPet(null)}>Clear</Button>
        </div>
        <a className="App-link animal-text" href="/">
          {pet}
        </a>
      </div>
    </div>
  );
}

export default App;
