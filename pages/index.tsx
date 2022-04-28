import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

async function getUsers(): Promise<[]> {
  const users = await fetch('https://jsonplaceholder.typicode.com/users');
  const jsonUsers = await users.json();
  return jsonUsers;
}

export type HomeProps = {
  users: []
}

export default function Home({users}:HomeProps){
  const [Search, setSearch] = useState('');

  const lowerUsers = Search.toLowerCase();

  const usersFilters = users.filter((user:any)=> user.name.toLowerCase().includes(lowerUsers))

  return (
    <section>
    <Head>
      <title>Exercicio</title>
      <meta name="description" content="exercicio front-end" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.container}>
      <input type="text"
       placeholder='Pesquisar por nome'
       value={Search}
       onChange={e => setSearch(e.target.value)}
       />
      <div className={styles.containerUsers}>
        {usersFilters.map((user: any,id: number)=>(
          <div className={styles.userContent} key={id}>
            <p><span>Id:</span> {user.id}</p>
            <p><span>Name:</span> {user.name}</p>
            <p><span>Username:</span> {user.username}</p>
            <p><span>Email:</span> {user.email}</p>
            <p><span>Anddress</span></p>
            <ul>
              <li><span>Street: </span>{user.address.street}</li>
              <li><span>suite: </span>{user.address.suite}</li>
              <li><span>city: </span>{user.address.city}</li>
              <li><span>zipcode: </span>{user.address.zipcode}</li>
              <p><span>Geo</span></p>
                <ul>
                  <li><span>lat: </span>{user.address.geo.lat}</li>
                  <li><span>lng: </span>{user.address.geo.lng}</li>
                </ul>
            </ul>
            <p><span>Phone:</span> {user.phone}</p>
            <p><span>WebSite:</span> {user.website}</p>
            <p><span>Company</span> {user.website}</p>
            <ul>
                <li><span>Name: </span>{user.company.name}</li>
                <li><span>CatchPhrase: </span>{user.company.catchPhrase}</li>
                <li><span>bs: </span>{user.company.bs}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
    </section>
  )
}

export async function getServerSideProps(){
  const users = await getUsers();

  return {
    props: {users},
  }
}