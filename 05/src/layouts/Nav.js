import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/" style={{'margin-left': '20px'}}>Home2</Link>
        <Link to="/" style={{ 'margin-left': '20px' }}>Home3</Link>
      </nav>
    );
  }
}

export default Nav;
