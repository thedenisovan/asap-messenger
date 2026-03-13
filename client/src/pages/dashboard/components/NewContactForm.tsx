import DarkIcon from '../../../components/common/DarkIcon';
import LightIcon from '../../../components/common/LightIcon';

export default function NewContactForm() {
  return (
    <dialog
      id='new-contact-dialog'
      className='gap-4 p-4 rounded-2xl w-[90%] max-w-140 border border-black absolute top-[50%] left-[50%] -translate-[50%]'
    >
      <header className='flex gap-2 items-center'>
        <LightIcon
          width='30px'
          path='M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z'
        />
        <DarkIcon
          width='30px'
          path='M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z'
        />
        <h2 className='text-gray-700 font-medium text-2xl'>Add New Contact</h2>
      </header>
      <p className='pt-4'>
        Enter the unique email of person you want to find and add to your
        contact's.
      </p>
      <form
        className='flex flex-col gap-4 pt-4'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Referral Email</label>
          <input
            className='p-4!'
            type='email'
            name='email'
            id='email'
            placeholder='e.g johnDoe@odin.com'
          />
        </div>
        <div className='flex justify-between'>
          <button type='button' command='close' commandfor='new-contact-dialog'>
            Cancel
          </button>
          <button>Find & Add</button>
        </div>
      </form>
    </dialog>
  );
}
