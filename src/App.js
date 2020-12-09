import React from 'react';
import Post from './components/Post';

function App() {
  return (
    <div className="App" data-testid="App">
      <div>top bar</div>
      <Post />
    </div>
  );
}

export default App;
