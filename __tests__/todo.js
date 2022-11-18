/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
let Today = new Date();
const thisDay = formattedDate(Today);
const yesterday = formattedDate(
  new Date(new Date().setDate(Today.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(Today.getDate() + 1))
);
describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: thisDay,
    });
  });
  test("Adding a new todo in the list", () => {
    add(
      {
        title: "Test todo",
        completed: false,
        dueDate: tomorrow,
        //console.log(dueDate),
      },
      {
        title: "Test todo",
        completed: false,
        dueDate: yesterday,
      }
    );
    const todoItemCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: yesterday,
    });

    expect(all.length).toBe(todoItemCount + 1);
  });
  test("Completing a list item todo", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Did overdue items completed", () => {
    let listOfTodos = overdue();

    expect(
      listOfTodos.every((todoitem) => {
        let check = todoitem.dueDate < thisDay;
        return check;
      })
    ).toBe(true);
  });
  test("Did duetoday items completed", () => {
    let listOfTodos = dueToday();
    expect(
      listOfTodos.every((todo) => {
        let check = todo.dueDate === thisDay;
        return check;
      })
    ).toBe(true);
  });
  test("Did due later items completed.", () => {
    let listOfTodos = dueLater();
    expect(
      listOfTodos.every((todo) => {
        let check = todo.dueDate > thisDay;
        return check;
      })
    ).toBe(true);
  });
});
