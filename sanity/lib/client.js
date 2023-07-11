import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  projectId: "ou9j803m",
  dataset: "production",
  apiVersion: "2021-10-14",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true
})
