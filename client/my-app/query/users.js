import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation Login($username: String, $password: String) {
  loginForm(username: $username, password: $password) {
    access_token
  }
}`

export const REGISTER = gql`
mutation Register($form: userForm) {
  addUser(form: $form) {
    _id
    name
    username
    email
    password
  }
}`;
