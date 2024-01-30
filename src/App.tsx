import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

const queryClient = new QueryClient()

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
          </div>
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
    
  );
}

export default App;


