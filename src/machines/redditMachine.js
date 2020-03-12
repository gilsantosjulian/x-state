import { Machine } from 'xstate'

const redditMachine = Nachine({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null
  },
  states: {
    idle: {},
    selected: {},
  }
});