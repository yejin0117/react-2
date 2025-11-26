//import Posts from "@/components/posts";
// import {Suspense} from "react";

// export default function RootPage(){
//   <div>
//     <h1>Hello Bar!</h1>
//   </div>
// }

import styles from "./blog.module.css";
import Image from "next/image";

export default function BlogPage() {
    <div>
      <div className={styles.blog}>
      </div>
      <Image
        className="dark:invert"
        src="/next.js.png"
        alt="Picture of the author"
        width={600}
        height={400}
      />
    </div>
}