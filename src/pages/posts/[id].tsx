import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { db } from '../../server/firebase';

export default function PostDescription() {
  const router = useRouter();

  return <div>{router.query.title}</div>;
}

// export async function getServerSideProps({ params }: any) {
//   console.log(params);

//   // const [posts, setPosts] = useState(null);

//   // const ref = collection(db, 'posts');

//   // const results = await onSnapshot(
//   //   query(collection(db, 'posts')),
//   //   (snapshot) => {
//   //     setPosts(snapshot.docs);
//   //   },
//   //   [],
//   // );
//   // console.log(results);

//   return {
//     props: {
//       posts: results,
//     },
//   };
// }
