import React from 'react'

function CreateAccount() {
  return (
    <div className='flex items-center justify-center h-screen px-4 py-6 text-white'>
              <div className="w-full text-white">
        <h2 className="mb-10 text-xl font-medium text-center">Create Account</h2>
        <form
          action=""
          className="flex flex-col gap-4 px-4 w-[90%] m-auto text-sm"
        >
          <label htmlFor="name">Name</label>
          <input
            className="p-2 rounded-md outline-none bg-neutral-800"
            id="name"
            type="text"
            placeholder="Enter your name"
          />
          <label htmlFor="email">Email</label>
          <input
            className="p-2 rounded-md outline-none bg-neutral-800"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="p-2 rounded-md outline-none bg-neutral-800"
            type="password"
            placeholder="Enter your password"
          />
          <button className="p-2 mt-2 rounded-md bg-neutral-800">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount