import React from 'react';
import Post from './components/Post';

function App() {
  return (
    <div className="App" data-testid="App">
      <div className="topBar">top bar y</div>
      <div className="feed">
        <Post />
      </div>
    </div>
  );
}

export default App;
