import React from 'react'
import { client } from '../../libs/client'

export default function BlogContent({ data }) {
  console.log(data)
  return <div>[id]</div>
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params
  const data = await client.get({ endpoint: 'blog', contentId: id })

  return {
    props: { data },
  }
}
