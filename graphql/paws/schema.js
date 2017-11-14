const schema = `
type Paw {   
  pawId: String
  type: String
  name: String
  picture: String
  owner: Owner
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

#returns a single Paw given a pawId
type Query {
  paw(pawId: String) : Paw
}`;

module.exports.schema = schema;
