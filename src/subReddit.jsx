import React from 'react';
import { useService } from '@xstate/react';

const Subreddit = ({ service }) => {

  const [ state, send ] = useService(service);

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
      data-machine={service.id}
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