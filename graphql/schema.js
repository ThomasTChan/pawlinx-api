const schema = `
type Paw {   
  dogId: Int
  type: String
  name: String
  picture: String
  owner: String
  weight: Int
  dob: String
  colour: [String]
  sex: String
  favouriteFood: String
  hobbies: [String]
  tag: Tag
  temperature: Float
}

type Owner {
  name: String
  dob: String
  sex: String
  picture: String
  location: Location
  contact: Contact
}

type Location {
  address1: String
  address2: String
  city: String
  province: String
  postalCode: String
}

type Tag {
  tagId: String
  institution: String
}

type Contact {
  tel: String
  email: String
}

#returns list of contributors
type Query {
  paw(dogId: Int) : Paw
}`;

module.exports.schema = schema;
