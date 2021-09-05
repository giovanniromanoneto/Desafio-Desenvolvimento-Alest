import { BrowserRouter, Route } from 'react-router-dom'
import { AuthContextProvider } from './auth/contextAuth';

import { Inicio } from './pages/inicio'
import { Produto } from './pages/produto'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Inicio} />
        <Route path="/produto" exact component={Produto} />
        <Route path="/produto/:idProduto" exact component={Produto} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
