import { Machine } from 'xstate'
import { assign } from 'xstate/lib/actionTypes';

const redditMachine = Nachine({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null
  },
  states: {
    idle: {},
    selected: {},
  },
  on: {
    SELECT: {
      target: '.selected',
      actions: assign({
        subreddit: (context, event) => event.name
      })
    }
  }
});

const selectEvent = {
  type: 'SELECT', // event type
  name: 'reactjs' // subreddit name
};