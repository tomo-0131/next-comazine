import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { UseAuthContext } from '../context/AuthContext';
import { db } from '../server/firebase';

interface Posts {
  id: string;
  data(): {
    username: string;
    uid: string;
    photoURL: string;
    image: string;
    title: any;
    description: string;
    timestamp: any;
    children?: ReactNode;
  };
}

const Feed: React.FC = () => {
  const { user } = UseAuthContext();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot: any) => {
      setPosts(snapshot.docs);
    });
  }, []);

  console.log(posts);

  return (
    <>
      <div className='-mt-6 flex justify-between items-center bg-teal-600 h-[400px] border-y border-black py-10 lg:py-0 hover:opacity-50 hover:bg-gray-900 max-w-7xl mx-auto'>
        <div className='px-10 space-y-5 text-white '>
          <h1 className='text-6xl max-w-xl font-serif'>
            <p className='underline decoration-white decoration-4 transition hover:scale-105 ease-in-out duration-100 transition-transform'>
              COMAZINE
            </p>
          </h1>
          {/* <img
            className='h-60 w-full object-cover hover:opacity-30 hover:bg-gray-500'
            src={posts[0].data().image}
          /> */}
          {/* {posts[0].title} */}
          <h2>
            It's easy and free to post my thinking on any topic and connect with millions of
            renders.
          </h2>
        </div>
        <img src='images/04_05_005.png' className='hidden md:inline-flex h-32 md:mr-8 lg:h-96' />
      </div>
      <div className='max-w-7xl mx-auto'>
        {/* Posts */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md: gap-6 p-2 md:p-6'>
          {posts.map((post: Posts) => (
            <Link>
            <button key={post.id}
              onClick=(() => {
                router.push({
                  pathname: '/posts/[post.id]',
                  query: { title: post.data().title },
                })
              })
            >
              <div className='border rounded-lg group cursor-pointer   hover:scale-105 transition-transform duration-200 ease-in-out'>
                <img
                  className='h-60 w-full object-cover hover:opacity-30 hover:bg-gray-500'
                  src={post.data().image}
                />
                <div className='flex justify-between p-5'>
                  <div>
                    <p className='text-lg font-bold hover:underline'>
                      {post.data().title}
                      <span>
                        <p className='text-xs'>by {post.data().username}</p>
                      </span>
                    </p>
                    <span className='relative hover:underline text-xs'>
                      <Moment fromNow>
                        {post.data().timestamp && post.data().timestamp.toDate()}
                      </Moment>
                    </span>
                  </div>
                  {/* <img className='h-12 w-12 rounded-full' src={} /> */}
                </div>
              </div>
            </button>
            </Link>
          ))}
          <br />
        </div>
      </div>
    </>
  );
};

export default Feed;
