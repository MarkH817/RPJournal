import React from 'react'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { useUser } from './hooks/useUser'
import Description from './Description'
import DetailsMenu from './styles/DetailsMenu'
import ErrorMessage from './ErrorMessage'
import Title from './Title'

export const SINGLE_ADVENTURE_QUERY = gql`
  query SINGLE_ADVENTURE_QUERY($id: ID!) {
    adventure(where: { id: $id }) {
      id
      title
      description
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
`

const StyledAdventure = styled.div`
  .adventure-details {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    & > * {
      flex: 1 1 15em;
    }
  }
`

/**
 * @param {object} props
 * @param {string} props.id
 */
export function SingleAdventure (props) {
  const { loading, error, data } = useQuery(SINGLE_ADVENTURE_QUERY, {
    variables: {
      id: props.id
    }
  })
  const user = useUser()

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  } else if (!data.adventure) {
    return <p>No adventure found for ID {props.id}</p>
  }

  /** @type {AdventureModel} */
  const adventure = data.adventure
  const showControls =
    !user.loading &&
    !user.error &&
    user.data.me &&
    adventure.owner.id === user.data.me.id

  return (
    <StyledAdventure>
      <Title title={adventure.title} />
      <h1>{adventure.title}</h1>
      <DetailsMenu>
        <div className='details'>
          <span>
            Created <TimeAgo date={adventure.createdAt} />
          </span>
          <span>
            Updated <TimeAgo date={adventure.updatedAt} />
          </span>
        </div>
      </DetailsMenu>

      <div className='adventure-details'>
        <section>
          {showControls && (
            <Link
              href={{
                pathname: '/update-adventure',
                query: { id: adventure.id }
              }}
            >
              <a>Update Adventure</a>
            </Link>
          )}
          <Description data={adventure.description} />
        </section>
      </div>
    </StyledAdventure>
  )
}

export default SingleAdventure
