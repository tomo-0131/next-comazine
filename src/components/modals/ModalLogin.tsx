import { Dialog, Transition } from '@headlessui/react';
import { LoginIcon } from '@heroicons/react/outline';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '../../server/firebase';
import { modalLogin } from '../atoms/modalAtom';

function ModalLogin() {
  const [open, setOpen] = useRecoilState(modalLogin);

  // const emailRef = useRef(null);
  // const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('ユーザー登録完了');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
        <div className='flex items-end mt-44 justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 lg:-mt-12'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white w-86 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:p-6 '>
              <div className='mt-3 text-center sm:mt-5'>
                <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
                  ⚡️ COMAZINEをはじめよう
                </Dialog.Title>
                <div className='mt-8 mb-8 lg:mt-4'>
                  <span>Firebase Authentication</span>
                </div>
              </div>

              <div className='sm:mt-6'>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    handleSubmit(email, password);
                  }}
                >
                  <div>
                    <label>メールアドレス</label>
                    <input
                      type='email'
                      placeholder='email'
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </div>
                  <div>
                    <label>パスワード</label>
                    <input
                      type='password'
                      placeholder='password'
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </div>
                  <button
                    type='submit'
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-md px-4 py-2 bg-teal-400 text-base font-medium text-white hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                  >
                    <LoginIcon className='h-24 mt-2 ml-4' />
                    <span className='font-bold text-xl w-96 mt-10 mb-5 lg:mt-10 lg:mb-5 lg:w-96'>
                      Login with Google
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalLogin;
