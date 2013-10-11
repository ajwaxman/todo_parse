$(function() {





  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("XMsy1ZU7YoR6rbsPC6XUAvNOqCksh04IRKYypDqc",
                   "2mty4fMXEsJfI5e3J6hWX77LTyoovZGGG4uY8doI");

  // Todo Model
  // ----------

  // Our basic Todo model has 'content', 'order', and 'done'
  var Todo = Parse.Object.extend("Todo", {
    // Default attributes for the todo.
    defaults: {
      content: "empty todo...",
      done: false
    },

    // Ensure that each todo created has 'content'.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Toggle the 'done' state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  // This is the trasient application state, not persisted on Parse
  var AppState = Parse.Object.extend("AppState", {
    defaults: {
      filter: "all"
    }
  });

  // Todo Collection
  // ---------------

  var TodoList = Parse.Collection.extend({

    // Reference to this collection's model.
    model: Todo,

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get('order');
    }

  });

  // Todo Item View
  // --------------

  

});