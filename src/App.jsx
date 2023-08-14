import './App.css'
import AddForm from './components/AddForm'
import EntryForm from './components/EntryForm'
import LotManagement from './components/LotManagement'
import VisualRepresentation from './components/VisualRepresentation'

function App() {

  return (
    <div className='App'>
    <header>
        <h1>Multi-storey parking lot</h1>
    </header>			
    <main>
      <div className="parking-container">
        <EntryForm />
        <AddForm />
        <LotManagement/>
        <VisualRepresentation/>
      </div>
    </main>
  </div>	
  )
}

export default App
