import logo from './logo.svg';
import './App.css';
import { Framework } from './Framework'
import {ComponentsProvider} from '@looker/components'

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ComponentsProvider>
          <Framework />
        </ComponentsProvider>        
      </header>
    </div>
  );
}

export default App;
