/**
 * Implementations for actions, activities, guards, and services can be 
 * referenced in the machine config as a string, and then specified as 
 * an object in the 2n d argument to Machine():
 */

const lightMachine = Machine({
  id: 'light',
  initial: 'green',
  states: {
    green: {
      // action referenced via string
      entry: 'alertGreen'
    }
  }
}, {
  actions: {
    // action implementation
    alertGreen: (context, event) => {
      alert('Green!');
    }
  },
  activities: {
    /* ... */
  },
  guards: {
    /* ... */
  },
  services: {
    /* ... */
  }
});

/**
 * This object has 4 optional properties:

    actions - the mapping of action names to their implementation
    activities - the mapping of activity names to their implementation
    guards - the mapping of transition guard(cond) names to their implementation
    services - the mapping of invoked service(src) names to their implementation# Extending Machines
 */



/**
 * Extending Machines
   Existing machines can be extended using.withConfig(), which takes the same object structure as above:
*/
const noAlertLightMachine = lightMachine.withConfig({
  actions: {
    alertGreen: (context, event) => {
      console.log('green');
    }
  }
});

/**
 * Initial Context
  As shown in the first example, the context is defined directly in the configuration itself.
  If you want to extend an existing machine with a different initial context, you can use.withContext() 
  and pass in the custom context:
 */

const testLightMachine = lightMachine.withContext({
  elapsed: 1000,
  direction: 'north'
});