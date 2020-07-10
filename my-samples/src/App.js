import React from 'react';
// import logo from './logo.svg';
import InputText from './coms/input-text';
import RadioTest from './coms/radio-test';
import CheckBoxTest from './coms/check-box';
import SelectTest from './coms/select';
import ListTest from './coms/list';
import emitter from './coms/events';
import SimpleCom from './coms/simplecom';
import VList from './coms/virtual-list';
import JqueryTest from './coms/jquery-test';
import './App.css';

function ListItem({ value }) { return (<li><span>{value}</span></li>); }
function List(props) {
  console.log('List: ', props);
  const { list, title } = props;
  return (
    <div>
      <div>{title}</div>
      <ul>
        {list.map((entry, index) => (<ListItem key={`list-${index}`} value={entry.text} />))}
      </ul>
    </div>);
}


class App extends React.Component {
  componentDidMount() {
    this.itemChange = emitter.on('ItemChange', (data) => { console.log(data); });
  }

  componentWillUnmount() {
    emitter.removeListener(this.itemChange);
  }

  render() {
    const list = [{ text: 'aaa' }, { text: 'bbb' }];
    const obj = { list: list, title: '---title---' };

    return (
      <div className="App">
        <header className="App-header">
          <div className="my-div">
            <SimpleCom test111='7777' />

            <JqueryTest></JqueryTest>
            <List {...obj} />
            <ListTest {...obj} />
            <InputText />
            <RadioTest />
            <CheckBoxTest />
            <SelectTest />

          </div>
          <VList />
        </header>

      </div>

    );
  }
}

// function App111() {
//   const list = [{ text: 'aaa' }, { text: 'bbb' }];
//   const obj = { list: list, title: 'title111' };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a> */}
//         <div className="my-div">
//           <List {...obj} />
//           <ListTest {...obj} />
//           <InputText />
//           <RadioTest />
//           <CheckBoxTest />
//           <SelectTest />
//         </div>
//       </header>

//     </div>
//   );
// }




export default App;
