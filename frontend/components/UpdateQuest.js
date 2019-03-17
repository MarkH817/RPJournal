import React, { PureComponent } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import { QUESTS_QUERY } from './Quests'
import { SINGLE_QUEST_QUERY } from './SingleQuest'
import Title from './Title'

export const UPDATE_QUEST_MUTATION = gql`
  mutation UPDATE_QUEST_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $completed: Boolean
  ) {
    updateQuest(
      id: $id
      title: $title
      description: $description
      completed: $completed
    ) {
      id
    }
  }
`

/**
 * @typedef {object} UpdateQuestProps
 * @property {string} id
 */

/** @augments {PureComponent<UpdateQuestProps>} */
export class UpdateQuest extends PureComponent {
  static defaultProps = {
    id: ''
  }

  state = {}

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  descriptionChange = description => this.setState({ description })

  updateQuest = async (event, updateQuestMutation) => {
    event.preventDefault()

    const { data } = await updateQuestMutation()

    if (data.updateQuest) {
      Router.push({
        pathname: '/quest',
        query: { id: data.updateQuest.id }
      })
    }
  }

  render () {
    const {
      props: { id },
      state
    } = this

    return (
      <Query query={SINGLE_QUEST_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>
          } else if (error) {
            return <ErrorMessage error={error} />
          } else if (!data.quest) {
            return <p>No quest found for ID {id}</p>
          }

          /** @type {QuestModel} */
          const quest = data.quest

          return (
            <div>
              <Title title='Update Quest' />
              <header>
                <h1>Updating - {quest.title}</h1>
              </header>

              <Mutation
                mutation={UPDATE_QUEST_MUTATION}
                variables={{ id, ...state }}
                refetchQueries={[
                  { query: SINGLE_QUEST_QUERY, variables: { id } },
                  {
                    query: QUESTS_QUERY,
                    variables: { adventureId: quest.adventure.id }
                  }
                ]}
              >
                {(updateQuest, { loading, error }) => (
                  <Form
                    onSubmit={event => this.updateQuest(event, updateQuest)}
                  >
                    <ErrorMessage error={error} />
                    <fieldset aria-busy={loading} disabled={loading}>
                      <label htmlFor='title'>
                        Title
                        <input
                          id='title'
                          type='text'
                          name='title'
                          defaultValue={quest.title}
                          onChange={this.handleChange}
                          required
                        />
                      </label>

                      <div className='description'>
                        Description
                        <Editor
                          initialText={quest.description}
                          onSave={this.descriptionChange}
                        />
                      </div>

                      <FormButton>Update Quest</FormButton>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default UpdateQuest
