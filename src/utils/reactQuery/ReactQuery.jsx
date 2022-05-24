import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function ReactQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isLoading, error, data } = useQuery('users', () =>
    fetch('https://http://localhost:8800/api/users').then(res => res.json())
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.username}</h1>
      <p>{data.desc}</p>
      <strong>👀 {data.email}</strong> <strong>✨ {data.id}</strong>{' '}
      <strong>🍴 {data.isAmin}</strong>
    </div>
  )
}
