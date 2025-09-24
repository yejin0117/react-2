import Link from "next/link";
import {posts} from "./posts";

export default function BlogPage3(){
  return(
    <div>
      <h1>블로그3 목록</h1>
      <ul>
        {posts.map((posts) => (
          <li key ={posts.slug}>
            <Link href={`/blog3/${posts.slug}`}>{posts.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}