import {
  Machine,
  assign
} from 'xstate';

export const redditMachine = Machine({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null,
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

