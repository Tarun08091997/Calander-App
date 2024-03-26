import LoginPage from "./components/pages/LoginPage/LoginPage";

function App() {
  return (
    <div className="App" style={
      {
        padding:0,
        margin:0,
        width:'100vw',
        height:'100vh',
        backgroundColor:'rgba(125,125,125,0.1)'
      }
    }>
      <LoginPage />
    </div>
  );
}

export default App;
