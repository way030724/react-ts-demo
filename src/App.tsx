import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function Square({value, onSquareClick}: {value: string, onSquareClick: () => void}) {
  return <button onClick={onSquareClick} className='square'>{value}</button>;
}

function AppBack() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));

  function handleClick(i: number) {
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>);
}

function ProductCategoryRow({category}: {category: string}) {
  return <tr><th colSpan={2}>{category}</th></tr>;
}

function ProductRow({product}: {product: {stocked: boolean, name: string, price: string}}) {
  const curName = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>;
  return <tr><td>{curName}</td><td>{product.price}</td></tr>;
}

function ProductTable({products, filterText, inStockOnly}: {products: {category: string, stocked: boolean, name: string, price: string}[], filterText: string, inStockOnly: boolean}) {

  const rows: JSX.Element[] = [];
  let lastCategory = '';
  products.forEach(product => {
    // Filter the products, ignore capitalization
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 || (!product.stocked && inStockOnly)) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} />);
    }
    rows.push(<ProductRow product={product} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}: {filterText: string, inStockOnly: boolean, onFilterTextChange: (value: string) => void, onInStockOnlyChange: (value: boolean) => void}) {
  return (
    <form>
      <input type="text" value={filterText} placeholder='Search...' onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function FilterableProductTable({products}: {products: {category: string, stocked: boolean, name: string, price: string}[]}) {
  const [filterText, setFilterText] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly} />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

export default App;
