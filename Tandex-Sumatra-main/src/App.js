import AuthProvider from "./auth/AuthProvider";
import TandexRouter from "./Router/TandexRouter";


function App() {
  return (
    <div>
      <AuthProvider>
        <TandexRouter />
      </AuthProvider>
    </div>
  );
}


export default App;
