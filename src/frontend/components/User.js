import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      name
      email
      permissions
      adventures(orderBy: title_ASC) {
        id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`

const User = props => <Query query={CURRENT_USER_QUERY}>{props.children}</Query>

export default User
