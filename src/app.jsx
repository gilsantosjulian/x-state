import React from 'react';
import { useMachine } from '@xstate/react';
import Subreddit from './subReddit.jsx';
import { redditMachine } from './machines/redditMachine';

const subredits = ['frontend', 'reactjs', 'vuejs'];

const App = () => {
  const [state, send] = useMachine(redditMachine);
  const { subreddit } = state.context;

  return (
    <main>
      <select
        onChange={e => {
          send('SELECT', { name: e.target.value });
        }}
      >
        {subredits.map(subreddit => {
          return <option key={subreddit}>{subreddit}</option>;
        })}
      </select>
      {subreddit && <Subreddit service={subreddit} key={subreddit} />}
    </main>
  );
};

export default App;
