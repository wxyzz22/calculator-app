import logo from './logo.svg';
import './App.css';
import * as React from 'react';

function App() {
  const [display, setDisplay] = React.useState('0');
  const [input, setInput] = React.useState('');
  const [theme, setTheme] = React.useState('1');

  const isOp = (str) => {
    switch (str) {
      case '+':
      case '-':
      case '*':
      case '/':
        return true;
      default:
        return false;
    }
  }

  const handleNum = (value) => {
    if (display === '0' || isOp(input[input.length-1])) {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
    setInput(input + value);
  }

  const handleOp = (value) => {
    if (isOp(input[input.length-1])) return;
    setInput(input + value);
  }

  const handleDel = () => {
    if (input === '') {
      return;
    } else if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
    setInput(input.slice(0, -1));
  }

  const handleReset = () => {
    setDisplay('0');
    setInput('');
  }

  const handleEval = () => {
    if (isOp(input[input.length-1])) {
      console.log(input);
      return;
    }
    if (input === '') {
      console.log(input);
      return;
    }
    const tempRes = eval(input) + '';
    setDisplay(tempRes);
    setInput(tempRes);
    console.log(input);
  }

  const handleTheme = (type) => {
    setTheme(type);
  }


  return (
    <div className={`body-wrapper theme-${theme}`}>
      <div className="App">
        <div className='header'>
          <div className="title">calc</div>
          <Theme theme={theme} themeHandler={handleTheme} />
        </div>
        <DisplayPanel content={display} />
        <Keyboard numHandler={handleNum} 
                  opHandler={handleOp} 
                  delHandler={handleDel}
                  resetHandler={handleReset}
                  evalHandler={handleEval} />
      </div>
    </div>
  );
}

const Theme = ({theme, themeHandler}) => {
  return (
    <div className='theme-box'>
      <div className='theme-box-title'>THEME</div>
      <div className='theme-box-panel'>
        <div className='theme-box-num'>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div className='theme-box-button'>
          <ThemeButton theme={theme} value='1' handler={themeHandler} />
          <ThemeButton theme={theme} value='2' handler={themeHandler} />
          <ThemeButton theme={theme} value='3' handler={themeHandler} />
        </div>
      </div>
    </div>
  )
}

const DisplayPanel = ({content}) => {
  return (
    <div className='display-panel'>{content}</div>
  )
}

const Keyboard = ({numHandler, opHandler, delHandler, resetHandler, evalHandler}) => {
  return (
    <div className='keyboard'>
      <div className='standard-button'>
        <Button classes='button gen-key' value='7' handler={numHandler} />
        <Button classes='button gen-key' value='8' handler={numHandler} />
        <Button classes='button gen-key' value='9' handler={numHandler} />
        <Button classes='button del-key' value='DEL' handler={delHandler} />
        <Button classes='button gen-key' value='4' handler={numHandler} />
        <Button classes='button gen-key' value='5' handler={numHandler} />
        <Button classes='button gen-key' value='6' handler={numHandler} />
        <Button classes='button gen-key' value='+' handler={opHandler} />
        <Button classes='button gen-key' value='1' handler={numHandler} />
        <Button classes='button gen-key' value='2' handler={numHandler} />
        <Button classes='button gen-key' value='3' handler={numHandler} />
        <Button classes='button gen-key' value='-' handler={opHandler} />
        <Button classes='button gen-key' value='.' handler={numHandler} />
        <Button classes='button gen-key' value='0' handler={numHandler} />
        <Button classes='button gen-key' value='/' handler={opHandler} />
        <Button classes='button gen-key' value='*' handler={opHandler} />
      </div>
      <div className='long-button'>
        <Button classes='button reset-key' value='RESET' handler={resetHandler} />
        <Button classes='button eval-key' value='=' handler={evalHandler} />
      </div>
    </div>
  )
}

const Button = ({classes, value, handler}) => {
  return (
    <button className={classes} type='button' onClick={() => handler(value)}>{value}</button>
  )
}

const ThemeButton = ({theme, value, handler}) => {
  const style = (theme === value) ? 'button button-active' : 'button';
  return (
    <button className={style} type='button' onClick={() => handler(value)}></button>
  )
}

export default App;
