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

type PawMetadata {
  beaconId: String
  name: String
  type: String
  picture: String
  owner: OwnerMetadata
}

type Owner {
  ownerId: String
  beaconIds: [String]
  name: String
  dob: String
  sex: String
  picture: String
  location: Location
  contact: Contact
  paws: [Paw]
}

type OwnerMetadata {
  name: String
  picture: String
}

type Location {
  address1: String
  address2: String
  city: String
  province: String
  postalCode: String
  country: String
}

type Tag {
  tagId: String
  institution: String
}

type Contact {
  tel: String
  email: String
}

type Query {
  #returns a single Paw given a pawId
  paw(pawId: String) : Paw
  #returns a single Owner given a ownerId
  owner(ownerId: String) : Owner
  #returns metadata for given beaconIds in list  
  pawMetadata(beaconIds: [String!]) : [PawMetadata]
}`;

module.exports.schema = schema;
