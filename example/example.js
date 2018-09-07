import React from 'react'
import DOM from 'react-dom'
import ArsArsenal from 'ars-arsenal'
import server from './server'

import './style'

let options = {
  url: '/api/photos',

  makeQuery(term) {
    return `term=${term}`
  },

  onError(response) {
    return `${response.code}: ${response.message}`
  },

  onChange(value) {
    console.log('Value changed to %s', value)
  },

  request: server
}

const Ars = ArsArsenal.component

function Example({ title, options }) {
  return (
    <div className="example">
      <div className="example-content">
        <h2 className="type-subheading">{title}</h2>
        <Ars {...options} />
      </div>
      <pre className="code">{JSON.stringify(options, null, 2)}</pre>
    </div>
  )
}

DOM.render(
  <div>
    <Example title="Basic Use" options={options} />
    <Example title="Basic Use: Table" options={{ ...options, mode: 'table' }} />
    <Example
      title="Basic Use: Pre-selected"
      options={{ ...options, picked: [1] }}
    />
    <Example
      title="Multiselect: Basic"
      options={{ ...options, multiselect: true }}
    />
    <Example
      title="Multiselect: Pre-selected"
      options={{ ...options, multiselect: true, picked: [2, 3] }}
    />
    <Example
      title="Multiselect: Table"
      options={{
        ...options,
        mode: 'table',
        multiselect: true,
        columns: ['id', 'name', 'caption']
      }}
    />
  </div>,
  document.getElementById('app')
)
