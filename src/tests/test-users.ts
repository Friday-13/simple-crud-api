import { IUser } from "../db/user-repository"

const testUsers: IUser[] = [
  {
    id: "576acc60-0780-4fad-b6de-3179f22fb10f",
    username: "john_doe",
    age: 28,
    hobbies: ["reading", "hiking", "photography"],
  },
  {
    id: "ecd3f785-2191-4004-bbed-6db98af65541",
    username: "alice_smith",
    age: 24,
    hobbies: ["painting", "yoga"],
  },
  {
    id: "9121bb8e-6231-4905-b387-e77fe3f2e56c",
    username: "bob_jackson",
    age: 32,
    hobbies: ["gaming", "cooking", "traveling"],
  },
  {
    id: "15fcad2d-bf8d-4574-a803-faeb7e12223c",
    username: "emma_wilson",
    age: 19,
    hobbies: ["singing", "dancing"],
  },
  {
    id: "a9edc13f-826d-49d0-bd9c-63c1ff57b443",
    username: "mike_brown",
    age: 45,
    hobbies: ["fishing", "woodworking"],
  },
  {
    id: "50b28778-0bb9-4d20-9f89-8b9da069e308",
    username: "sarah_lee",
    age: 29,
    hobbies: ["coding", "chess", "biking"],
  },
  {
    id: "06596cf1-f65d-4303-be46-fe0bc5a0d99e",
    username: "david_clark",
    age: 37,
    hobbies: ["running", "movies"],
  },
  {
    id: "12940842-023d-49c5-b93a-c9e86d9c674f",
    username: "lisa_taylor",
    age: 22,
    hobbies: ["blogging", "shopping"],
  },
  {
    id: "633df228-8d80-4e6d-84b1-22649e934ebb",
    username: "kevin_adams",
    age: 31,
    hobbies: ["football", "music"],
  },
  {
    id: "c8484f2f-983b-43d1-b548-bb93bb1c8a37",
    username: "anna_white",
    age: 26,
    hobbies: ["gardening", "knitting"],
  },
]

export {testUsers as default};
