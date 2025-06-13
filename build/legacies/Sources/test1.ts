interface Pizza {
  name: string;
  toppings: string[];
}

type PizzaType = {
  name: string;
  toppings: string[];
};

class PizzaClass {
  constructor(public name: string, public toppings: string[]) {}
}

function pizzaMaker(pizza: Pizza) {
  console.log(`name: ${pizza.name}`);
}

const pizza1: Pizza = { name: "Margherita", toppings: ["Mozzarella", "Basil"] }

const pizza2: PizzaType = {
  name: "Marinara",
  toppings: ["Anchovy", "Oregano"],
};

const pizza3 = new PizzaClass("Palma", ["Mozzarella", "Prosciutto", "Arugula"]);

pizzaMaker(pizza1);
pizzaMaker(pizza2);
pizzaMaker(pizza3);

console.log(typeof(pizza1));
console.log(typeof(pizza2));
console.log(typeof(pizza3));

// sole.log(pizza1 instanceof Pizza);
// sole.log(pizza2 instanceof PizzaType);
console.log(pizza3 instanceof PizzaClass);
