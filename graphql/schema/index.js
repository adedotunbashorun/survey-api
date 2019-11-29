
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type UserData {
        _id: ID!
        user: User!
        survey: Survey!
        name: String!
        phone: String!
    }

    type Survey {
        _id: ID!
        answer: String!
        creator: User!
        userdata: UserData!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        createdSurveys: [Survey!]
        createdUserData:[UserData!]
    }

    type AuthData {
        userId: ID!
        token: String!
        email: String!
        tokenExpiration: Int!
    }

    input SurveyInput {
        answer: String!
        creator: String
        userdata: String
    }

    input UserDataInput {
        user: String
        survey: String
        name: String!
        phone: String!
    }

    input UserInput {
        email: String!
        password: String
        createdSurveys: String
    }

    type RootQuery {
        surveys: [Survey!]!
        users: [User!]!
        userdata: [UserData!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createSurvey(surveyInput: SurveyInput): Survey
        createUserData(userdataInput: UserDataInput): UserData
        createUser(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);