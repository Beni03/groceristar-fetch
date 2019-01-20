const _            = require('lodash');


const fs           = require('fs');

const uuidv1       = require('uuid/v1');


const departments  = require('../../data/Departments/departments.json');
let groceries      = require('../../data/Grocery/grocery.json');
const ingredients  = require('../../data/Ingredients/ingredients.json');
const users        = require('../../data/Users/users.json');


const parser = function(filename) {

  return JSON.parse(JSON.stringify(filename))

}



module.getIngredients = function() {
  return parser(ingredients)
}

module.getGrocery = function() {
  return parser(groceries)
}

// @TODO i think as showcase is a separated project, we can move this method to
// a separated place, in order to make it cleaner
module.getGroceryShowcase = function() {
  //@TODO can we just merge together 2 arrays instead of adding this 2 values?
  //maybe it can be better

  //parser replace
  let parsedGroceries = parser(groceries);
  // console.log(parsedGroceries);

  let groceriesWithCss = parsedGroceries.map((item) => {
    item.height = 200;
    item.css = "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)"
    return item;
  });
  // console.log(groceriesWithCss);

  return groceriesWithCss;
}

module.getUsers = function() {
  return parser(users)
}

module.getDepartments = function() {
  return parser(departments)
}

module.getGroceryById = function(id) {
  //parser replace
  return [_.find(parser(groceries), ['id', id])];
};

module.getGroceryByName = function(name) {
  //parser replace
  return _.filter(parser(groceries), function(item) {
    return item.name === name;
  })
}

module.getGroceryByNameWithDepAndIng = function( name ) {
  //parser replace
  let grocery = _.filter(parser(groceries),
    function(item) {
      return item.name === name;
    });

  let result = [];
  grocery[0]["departments"].forEach(
    function(department) {

      //@TODO add let ingredients = module.getAllIngredientsByOneDepartment(department)

      result.push({
        "department": department,
        "ingredients": module.getAllIngredientsByOneDepartment(department)
      });
    });
  return result;
}

// strange turnaround. @TODO can we
module.getGroceryListsWithCountDepartments = function() {
  //parser replace
  return _.map(parser(groceries), item => {
    const object = {
      id: item.id,
      name: item.name,
      departmentsCount: item.departments.length
    };
    delete object.departments;
    return object;
  });
};

module.getAllDepartments = function() {
  const departments = [];
  _.forEach(_.range(0, groceries.length), value =>
    departments.push(..._.map(groceries[value]['departments']))
  );
  return departments;
};

module.getAllIngredientsByOneDepartment = function(department) {

  var ingredientsList =
    _.filter(parser(ingredients), function(item) {
      return item.department === department;
    });
  return _.map(ingredientsList, 'name');
}

module.getAllDepartmentList = function() {
  return _.map(this.getDepartments(), item => ({
    key: uuidv1(),
    departmentName: item
  }));
};

module.getAllIngredientsList = function(department) {
  const ingredients = this.getAllIngredientsByOneDepartment(department);

  return ingredients.map(item => ({
    key: uuidv1(),
    name: item.name,
    isChecked: false
  }));
};

module.getAllGrocery = function() {
  //parser replace
  return _.map(parser(groceries), item => ({
    key: uuidv1(),
    ...item
  }));
};

module.getAllGroceryDepartment = function(departmentArray) {
  const departmentArrayObject = departmentArray.map(item => ({
    key: uuidv1(),
    departmentName: item,
    isChecked: false
  }));
  return departmentArrayObject;
};

module.createNewGroceryList = function(newDepartment) {
  const nameExists = _.find(
    groceries,
    item => item.name === newDepartment.name
  );
  !nameExists && newGroceryList(newDepartment);
};

//TODO OMG, this method looks so sad...
module.getGroceryListsByDepartment = department => {
  let parsedGroceries = parser(groceries),
    groceryList = [];
  if (department) {
    capitalisedDepartment = department[0].toUpperCase() + department.toLowerCase().substr(1);
    parsedGroceries.map(grocery => {
      if (grocery.departments.includes(department.toLowerCase()) ||
        grocery.departments.includes(department.toUpperCase()) ||
        grocery.departments.includes(capitalisedDepartment)
      ) {
        groceryList.push({
          name: grocery.name,
          id: grocery.id
        });
      }
    });
    return groceryList;
  }
  return groceryList;
}

//@TODO should work now.
function newGroceryList(newDepartment) {
  const groceriesFile = fs.createWriteStream('./data/Grocery/grocery.json');
  const newGrocery = [...parser(groceries), newDepartment];
  groceriesFile.write(JSON.stringify(newGrocery, null, 2));
  groceries = newGrocery;
}

module.getDepartmentsGraphQL = function(){
  let results = parser(departments);
  return results.map((item, index) =>({
    department_id: ++index,
    name: item.name,
    desc: "description for department1",
    created_at: Date.now(),
    updated_at: Date.now()
    }))
};

module.getDepartmentsGraphQLKey = function(){
  let results = parser(departments);
  return results.map((item, index) =>({
    department_id: uuidv1(),
    name: item.name,
    desc: "description for department1",
    created_at: Date.now(),
    updated_at: Date.now()
    }))
};

module.getGroceryGraphQL = function(){
  let results = parser(groceries);
  return results.map((item, index) =>({
    grocery_id: ++index,
    name: item.name,
    img:  item.img,
    desc: item.desc,
    slug: item.slug,
    created_at: Date.now(),
    updated_at: Date.now(),
    id_1: 1,
    favs: false
    }))
};

module.getGroceryGraphQLKey = function(){
  let results = parser(groceries);
  return results.map((item, index) =>({
    grocery_id: uuidv1(),
    name: item.name,
    img:  item.img,
    desc: item.desc,
    slug: item.slug,
    created_at: Date.now(),
    updated_at: Date.now(),
    id_1: 1,
    favs: false
    }))
};

module.getIngredientsGraphQL = function(){
  let results = parser(ingredients);
  return results.map((item, index) =>({
    ingredient_id: ++index,
    favs:'',
    name: item.name,
    description: "description",
    custom: false,
    created_at: Date.now(),
    updated_at: Date.now(),
    id_1: 1,
    department_id: 1
    }))
};

module.getIngredientsGraphQLKey = function(){
  let results = parser(ingredients);
  return results.map((item, index) =>({
    ingredient_id: uuidv1(),
    favs:'',
    name: item.name,
    description: "description",
    custom: false,
    created_at: Date.now(),
    updated_at: Date.now(),
    id_1: 1,
    department_id: 1
    }))
};

module.getUsersGraphQL = function(){
  let results = parser(users);
  return results.map((item, index) =>({
    userId: ++index,
    favs: false,
    ingredient_id: 1,
    grocery_id: 1
    }))
};
module.getUsersGraphQLKey = function(){
  let results = parser(users);
  return results.map((item, index) =>({
    userId: uuidv1(),
    favs: false,
    ingredient_id: 1,
    grocery_id: 1
    }))
};
module.exports = module;
