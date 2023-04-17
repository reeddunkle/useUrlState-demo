import "./App.css";
import useUrlState from "./useUrlState";
import useNavigate from "./useUrlState/useNavigate";

// Util
const noop = () => {};

const Button = ({ children, onClick = noop, ...props }) => {
  return (
    <button className="button" onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// Data
const languages = ["React", "Svelte", "Visual Basic"];

const animals = ["Cat", "Dog", "Rock"];

function App() {
  const [urlState, setUrlState] = useUrlState({ language: "React" });
  const navigate = useNavigate();

  const { language = "", pet = "" } = urlState;

  const setLanguage = (lang) => {
    setUrlState({
      language: lang,
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
            <Button key={lang} onClick={() => setLanguage(lang)}>
              {lang}
            </Button>
          ))}
          <Button onClick={() => setLanguage(null)}>Clear</Button>
        </div>
        <a className="language-text link" href="/">
          {language}
        </a>
        <div className="animal-buttons">
          {animals.map((animal) => (
            <Button key={animal} onClick={() => setPet(animal)}>
              {animal}
            </Button>
          ))}
          <Button onClick={() => setPet(null)}>Clear</Button>
        </div>
        <a className="animal-text link" href="/">
          {pet}
        </a>
        <Button onClick={() => navigate("/")}>Clear All</Button>
      </div>
    </div>
  );
}

export default App;
