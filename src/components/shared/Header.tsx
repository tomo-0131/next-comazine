import { Menu, Transition } from '@headlessui/react';
import { ChatIcon, CogIcon, HomeIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { UseAuthContext } from '../../context/AuthContext';
import { auth } from '../../server/firebase';
import { modalLogin } from '../atoms/modalAtom';
import ModalLogin from '../modals/ModalLogin';
import HeaderTab from './HeaderTab';

function Header() {
  const { user } = UseAuthContext();

  console.log(user);

  const [open, setOpen] = useRecoilState(modalLogin);

  const logout = () => {
    auth.signOut();
    alert('ログアウト完了');
    location.reload();
  };

  const defaultAvatar: string | undefined = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE;

  const defaultName: string = 'ゲストユーザー';

  return (
    <>
      <header className='max-w-7xl flex justify-between p-5 mx-auto'>
        <div className='flex items-center space-x-12'>
          <Link href='/'>
            <img
              src='/images/COMAZINE.png'
              className='w-32 md:w-44 -mt-1 object-contain cursor-pointer transition hover:scale-105 ease-in-out duration-200 transition-transform'
            />
          </Link>

          <div className='hidden md:inline-flex items-center space-x-5'>
            <h3 className='transition hover:scale-105 ease-in-out duration-200 transition-transform'>
              Member
            </h3>
            <h3>Project</h3>
            <h3></h3>
            {/* <h3 className="text-white bg-teal-600 rounded-full px-4 py-1">
            Follow
          </h3> */}
          </div>
        </div>

        <div className='flex items-center space-x-5 text-black'>
          {user && (
            <span>
              <Menu>
                {({ open }) => (
                  <>
                    <span className=''>
                      <Menu.Button className='pt-4'>
                        {user.photoURL ? (
                          <img src={user.photoURL} className='rounded-full w-9 h-9' />
                        ) : (
                          <img
                            src={defaultAvatar}
                            className='-mt-1 rounded-full w-9 h-9 duration-500 hover:scale-110 ease-in-out'
                          />
                        )}
                      </Menu.Button>
                    </span>

                    <Transition show={open}>
                      <Menu.Items
                        static
                        className='z-50 fixed right-0 w-56 mt-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none lg:mr-32 lg:mt-1'
                      >
                        <div className='px-4 py-3 bg-white'>
                          <p className='text-sm leading-5'>Signed in as</p>
                          {user.displayName ? (
                            <p className='text-sm font-medium leading-8 text-gray-700 truncate'>
                              {user.displayName}
                            </p>
                          ) : (
                            <p className='text-sm font-medium leading-8 text-gray-700 truncate'>
                              {defaultName}
                            </p>
                          )}
                        </div>

                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <>
                                <span
                                  className={`${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                  } flex w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  <CogIcon className='relative h-6 w-6 ml-0' />
                                  <Link href='/mypage'>
                                    <span className='justify-start items-center mt-0.5 ml-2'>
                                      My page
                                    </span>
                                  </Link>
                                </span>
                              </>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } flex justify-start w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                <HomeIcon className='relative h-6 w-6 ml-0' />
                                <Link href='/'>
                                  <span className='justify-start items-center mt-0.5 ml-2'>
                                    Home
                                  </span>
                                </Link>
                              </span>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } flex w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                <ChatIcon className='relative h-6 w-6 ml-0' />
                                <Link href='/about'>
                                  <span className='flex justify-center items-center mt-0.5 ml-2'>
                                    About
                                  </span>
                                </Link>
                              </span>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } flex w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                <ChatIcon className='relative h-6 w-6 ml-0' />
                                <Link href='/graphql'>
                                  <span className='flex justify-center items-center mt-0.5 ml-2'>
                                    GraphQL
                                  </span>
                                </Link>
                              </span>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                onClick={logout}
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                Sign out
                              </span>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </span>
          )}
          {!user && (
            <span>
              <button onClick={() => setOpen(true)}>
                <span>Sign In</span>
                <ModalLogin />
              </button>
            </span>
          )}
          <h3 className='hidden border px-2 py-2 rounded-full border-black'>Get Started</h3>
        </div>
      </header>
      <HeaderTab />
    </>
  );
}

export default Header;
