import Calendar from './components/Calendar';
import ShopItemClass from './components/ShopItemClass';
import ShopItemFunc from './components/ShopItemFunc';
import './App.css';

function App() {
  const item = {
    brand: 'Tiger of Sweden',
    title: 'Leonard coat',
    description: 'Minimalistic coat in cotton-blend',
    descriptionFull: 'Men\'s minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.',
    price: 399,
    currency: '£',
  };
  
  return (
    <>
      <div className="container">
        <div className="background-element" />
        <div className="highlight-window">
          <div className="highlight-overlay" />
        </div>
        <div className="window">
          <h2 className="component-title">Functional Component</h2>
          <ShopItemFunc item={item} />
        </div>
      </div>
      <div className="container">
        <div className="background-element" />
        <div className="highlight-window">
          <div className="highlight-overlay" />
        </div>
        <div className="window">
          <h2 className="component-title">Class Component</h2>
          <ShopItemClass item={item} />
        </div>
      </div>
      <div className="calendar-container">
        <Calendar date={new Date()} />
      </div>
    </>
  );
}

export default App;
