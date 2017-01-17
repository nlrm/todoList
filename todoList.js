var todoList = {
	todos: [],
	addTodo: function(todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},
	changeTodo: function(position, todoText) {
		this.todos[position].todoText = todoText;
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);	
	},
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;	
	},
	toggleAll: function() {
		var completedTodos = 0;
		var totalTodos = this.todos.length;

		this.todos.forEach(function(todo) {
			if (todo.completed) {
				completedTodos++;
			}
		});

		this.todos.forEach(function(todo) {
			if (completedTodos === totalTodos) {
				todo.completed = false;
			} else {
				todo.completed = true;
			}
		});
	}
};

var handlers = {
	addTodo: function() {
		var addTodoTextInput = document.getElementById("addTodoTextInput");
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = "";
		view.displayTodos();
	},
	changeTodo: function() {
		var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
		var changeTodoTextInput = document.querySelector("#changeTodoTextInput");
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value); 
		changeTodoPositionInput.value = "";
		changeTodoTextInput.value = "";
		view.displayTodos();		
	},
	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		view.displayTodos();		
	},
	toggleCompleted: function() {
		var toggleCompletedPosition	= document.getElementById("toggleCompletedPosition");
		todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
		toggleCompletedPosition.value = "";
		view.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();		
	}
};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector("ul");
		todosUl.innerHTML = "";

		todoList.todos.forEach(function(todo, position) {
			var todoLi = document.createElement("li");
			var todoTextWithCompletion = "";

			if (todo.completed) {
				todoTextWithCompletion = "[ X ] " + todo.todoText;				
			} else {
				todoTextWithCompletion = "[  ] " + todo.todoText;				
			}	
			todoLi.id = position;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);
		}, this);
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},
	setUpEventListeners: function() {

		// Event delegation
		var todosUl = document.querySelector("ul");
		todosUl.addEventListener("click", function(e) {
			console.log(e.target.parentNode.id);

			// Get the element that was clicked on
			var elementClicked = e.target;

			// Check if elementClicked is a delete button
			if (elementClicked.className === "deleteButton") {
				handlers.deleteTodo(parseInt(e.target.parentNode.id));
			}
		});
	}
};

view.setUpEventListeners();


