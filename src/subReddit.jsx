import React, { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { createSubredditMachine } from "./machines/subredditMachine";

const Subreddit = ({ name }) => {

  console.log('name');
  console.log(name);
  

  // Only create the machine based on the subreddit name once
  const subredditMachine = useMemo(() => {
    return createSubredditMachine(name);
  }, [name])

  const [ state, send ] = useMachine(subredditMachine);

  if (state.matches('failure')) {
    return (
      <div>
        Failed to load posts.{' '}
        <button onClick={ _ => send('RETRY') }>Retry?</button>
      </div>
    );
  }

  const { subreddit, posts, lastUpdated } = state.context;

  return (
    <section
      data-machine={subredditMachine.id}
      data-state={state.toStrings().join(' ')}
    >
      {state.matches('loading') && <div>Loading posts...</div>}
      {
        posts && (
          <>
            <header>
              <h2>{subreddit}</h2>
              <small>
                Last updated: {lastUpdated}{' '}
                <button onClick={_ => send('REFRESH')}>Refresh</button>
              </small>
            </header>
            <ul>
              {posts.map(post => {
                return <li key={post.id}>{post.title}</li>;
              })}
            </ul>
          </>
        )
      }
    </section>
  );
};

export default Subreddit;