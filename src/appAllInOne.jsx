import React from 'react';
import { useMachine } from '@xstate/react';
import { redditMachine } from './machines/redditMachine';

const subredits = ['frontend', 'reactjs', 'vuejs'];

const App = () => {
  const [ state, send ] = useMachine(redditMachine);
  const { subreddit, posts } = state.context;

  return (
    <main>
      <header>
        <select
          onChange={e => {
            send('SELECT', { name: e.target.value });
          }}
        >
          {subredits.map(subreddit => {
            return <option key={subreddit}>{subreddit}</option>;
          })}
        </select>
      </header>

      <section>
        <h1>{state.matches('idle') ? 'Select a subreddit' : subreddit}</h1>
        {state.matches({ selected: 'loading' }) && <div>Loading...</div>}
        {state.matches({ selected: 'loaded' }) && 
          <ul>
          {posts.map(post => (
            <li key={post.title}>{post.title}</li>
          ))}
          </ul>
        }
      </section>
    </main>
  );
};

export default App;
