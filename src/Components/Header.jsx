const Header = ({ onAddProjectClick }) => {
  return (
    <div className='w-full h-16 bg-gray-300 border-b px-4 flex items-center justify-between'>
      <h2 className='text-xl font-semibold'>Header</h2>
      <button
        onClick={onAddProjectClick}
        className='bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        + Add Project
      </button>
    </div>
  )
}

export default Header
