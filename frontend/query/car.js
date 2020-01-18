import gql from 'graphql-tag';

export const ADD_CAR = gql`
mutation Car($model: String!, $brand: String!, $year: Int!, $horsepower: Int!) {
  addCar(model: $model, brand: $brand, year: $year, horsepower: $horsepower) {
    id,
    brand,
    model,
    year,
    horsepower
  }
}
`;

//Need full details to update the cache properly
export const MY_CARS = gql`
query {
    myCars {
        id,
        brand,
        model,
        year,
        horsepower
    }
}
`;

//Need full details to update the cache properly
export const MY_CARS_WITH_OWNER = gql`
query {
    myCars {
        id,
        brand,
        model,
        year,
        horsepower
    }
}
`;

export const DELETE_CAR = gql`
mutation Car($id: ID!) {
    deleteCar(id: $id) {
        id
    }
}
`;


export const EDIT_CAR = gql`
mutation Car($id: ID!, $model: String!, $brand: String!, $year: Int!, $horsepower: Int!) {
  editCar(id: $id, model: $model, brand: $brand, year: $year, horsepower: $horsepower) {
    id
  }
}
`;

export const MY_CAR = gql`
query Car($id: ID!) {
  myCar(id: $id) {
    id,
    brand,
    model,
    year,
    horsepower
  }
}
`;