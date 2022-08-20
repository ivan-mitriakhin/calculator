import React from 'react';
import './App.css';

function Buttons(props) {
  return (
    <div className="buttons">
      <button className="jumbo" onClick={props.initialize} id="clear" value="AC">AC</button>
      <button id="divide" onClick={props.operators} value="/">/</button>
      <button id="multiply" onClick={props.operators} value="x">x</button>
      <button id="seven" onClick={props.numbers} value="7">7</button>
      <button id="eight" onClick={props.numbers} value="8">8</button>
      <button id="nine" onClick={props.numbers} value="9">9</button>
      <button id="subtract" onClick={props.operators} value="-">-</button>
      <button id="four" onClick={props.numbers} value="4">4</button>
      <button id="five" onClick={props.numbers} value="5">5</button>
      <button id="six" onClick={props.numbers} value="6">6</button>
      <button id="add" onClick={props.operators} value="+">+</button>
      <button id="one" onClick={props.numbers} value="1">1</button>
      <button id="two" onClick={props.numbers} value="2">2</button>
      <button id="three" onClick={props.numbers} value="3">3</button>
      <button className="jumbo" onClick={props.numbers} id="zero" value="0">0</button>
      <button id="decimal" value=".">.</button>
      <button id="equals" value="=">=</button>
    </div>
  );
}

function App() {
  const isOperator = /[x/+-]/;
  const endsWithOperator = /[x/+-]$/;
  const endsWithNegativeSign = /\d[x/+-]-$/;
  
  let [currentValue, setCurrentValue] = React.useState('0');
  let [previousValue, setPreviousValue] = React.useState('0');
  let [formula, setFormula] = React.useState('');
  let [evaluated, setEvaluated] = React.useState(false);

  const maxDigitWarning = () => {
    setPreviousValue(currentValue);
    setCurrentValue('Digit Limit Met');

    setTimeout(() => { setCurrentValue(previousValue) }, 1000);
  };

  const handleOperators = (event) => {
    if (currentValue !== 'Digit Limit Met') {
      const value = event.target.value;
      setCurrentValue(value);
      setEvaluated(false);
      if (evaluated) {
        setFormula(previousValue + value);
      } else if (!endsWithOperator.test(formula)) {
        console.log('1')
        setPreviousValue(formula);
        setFormula(formula + value);
      } else if (!endsWithNegativeSign.test(formula)) {
        console.log('2')
        setFormula((endsWithNegativeSign.test(formula + value) ? formula : previousValue) + value)
      } else if (value !== '-') {
        console.log('3')
        setFormula(previousValue + value);
      } 
    }
  };

  const handleNumbers = (event) => {
    if (currentValue !== 'Digit Limit Met') {
      const value = event.target.value;
      setEvaluated(false);
      if (currentValue.length > 21) {
        maxDigitWarning();
      } else if (evaluated) {
        setCurrentValue(value);
        setFormula(value !== '0' ? value : '');
      } else {
        setCurrentValue(currentValue === '0' || isOperator.test(currentValue) ? 
                        value : currentValue + value);
        setFormula(currentValue === '0' && value === '0' ? (formula === '' ? value : formula) : 
                   /([^.0-9]0|^0)$/.test(formula) ? formula.slice(0, -1) + value : formula + value);
      } 
    }
  };

  const initialize = () => {
    setCurrentValue('0');
    setPreviousValue('0');
    setFormula('');
    setEvaluated(false);
  };

  return (
    <div id="app">
      <div className="calculator">
        <div className="formulaScreen">{formula}</div>
        <div className="outputScreen">{currentValue}</div>
        <Buttons initialize={initialize} numbers={handleNumbers} operators={handleOperators}/>
      </div>
    </div>
  );
}

export default App;
