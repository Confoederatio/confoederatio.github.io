//Initialise functions
{
  /*
    createAction() - Sets the action performed in the current timeline.
    arg0_action_key: (String) - The key to assign to the action in question.
    arg1_options: (Object)
      name: (String) - The human-readable name of the action.

      function: (String) - The function key which performs the action
      reverse_function: (String) - The function key which reverses the action

      <variable_name>: (Variable) - Other flags to transfer over to the action object.

    Returns: (Object, Action)
  */
  window.createAction = function (arg0_action_key, arg1_options) {
    //Convert from parameters
    var action_key = arg0_action_key;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var all_options = Object.keys(options);

    //Just make sure window.actions exists
    initialiseUndoRedo();

    //Set action
    window.actions[action_key] = {
      id: action_key
    };

    //Iterate over all_options
    for (var i = 0; i < all_options.length; i++)
      window.actions[action_key][all_options[i]] = options[all_options[i]];

    //Return statement
    return window.actions[action_key];
  }

  /*
    deleteAction() - Deletes an action from the action config.
    arg0_action_key: (String) - The key of the action to delete.

    Returns: (Object, Action)
  */
  window.deleteAction = function (arg0_action_key) {
    //Convert from parameters
    var action_key = arg0_action_key;

    //Just make sure window.actions exists
    initialiseUndoRedo();

    //Remove action
    delete window.actions[action_key];
  }

  //initialiseUndoRedo() - Initialises action config/caching if necessary
  window.initialiseUndoRedo = function () {
    //Initialises global variables for actions/timelines respectively
    if (!window.actions) window.actions = {};
    if (!window.timelines) window.timelines = {};

    if (!window.actions.current_timeline) {
      var current_timeline_id = generateRandomID(window.timelines);

      window.actions.current_index = 0;
      window.actions.current_timeline = current_timeline_id;
      window.actions.initial_timeline = current_timeline_id;
      window.timelines[current_timeline_id] = [];
    }
  }

}
