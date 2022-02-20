import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { client } from './../libs/client'

export default function Home({ contents }) {
  console.log(contents)
  return (
    <>
      <h1>blog</h1>
      {contents.map((content, i) => (
        <li key={i}>
          <Link href={`/blog/${content.id}`}>
            <a>{content.title}</a>
          </Link>
        </li>
      ))}
    </>
  )
}

export const getStaticProps = async () => {
  const { contents } = await client.get({ endpoint: 'blog' })
  return {
    props: { contents },
  }
}
