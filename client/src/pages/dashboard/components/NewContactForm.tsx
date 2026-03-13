export default function NewContactForm() {
  return (
    <dialog id='new-contact-dialog' className='border border-black'>
      <header></header>
      <p></p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <button type='button' command='close' commandfor='new-contact-dialog'>
            Cancel
          </button>
          <button>Find & Add</button>
        </div>
      </form>
    </dialog>
  );
}
