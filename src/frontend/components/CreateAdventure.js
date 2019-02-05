import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import { ADVENTURES_QUERY } from './Adventures'
import Title from './Title'

export const CREATE_ADVENTURE_MUTATION = gql`
  mutation CREATE_ADVENTURE_MUTATION($title: String!, $description: String!) {
    createAdventure(title: $title, description: $description) {
      id
    }
  }
`

export class CreateAdventure extends PureComponent {
  state = {
    title: '',
    description: ''
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   */
  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @param {any} createAdventureMutation
   */
  createAdventure = async (event, createAdventureMutation) => {
    event.preventDefault()

    const { data } = await createAdventureMutation()

    Router.push({
      pathname: '/adventure',
      query: { id: data.createAdventure.id }
    })
  }

  render () {
    const { title, description } = this.state

    return (
      <div>
        <Title title='New Adventure' />
        <h1>Create New Adventure</h1>

        <Mutation
          mutation={CREATE_ADVENTURE_MUTATION}
          variables={{ title, description }}
          refetchQueries={[{ query: ADVENTURES_QUERY }]}
        >
          {(createAdventure, { loading }) => (
            <Form
              onSubmit={event => this.createAdventure(event, createAdventure)}
            >
              <fieldset aria-busy={loading} disabled={loading}>
                <label htmlFor='title'>
                  Title
                  <input
                    id='title'
                    type='text'
                    name='title'
                    value={title}
                    onChange={this.handleChange}
                    required
                  />
                </label>

                <label htmlFor='description'>
                  Description
                  <textarea
                    id='description'
                    name='description'
                    value={description}
                    onChange={this.handleChange}
                    required
                  />
                </label>

                <button type='submit'>Create Adventure</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
      </div>
    )
  }
}

export default CreateAdventure
