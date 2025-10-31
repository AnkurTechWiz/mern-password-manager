import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';


const Manager = () => {



    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: '', username: '', password: '' })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch('http://localhost:3000/')
        let passwords = await req.json()
        console.log(passwords);
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])


    const showPassword = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            ref.current.src = "icons/eye.png";
        } else {
            passwordRef.current.type = "password";
            ref.current.src = "icons/eye-off.png";
        }
    }

    const savePassword = async () => {
        if (
            form.site.length > 3 &&
            form.username.length > 3 &&
            form.password.length > 3
        ) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

             await fetch('http://localhost:3000/', {
                method: 'DELETE',
                headers: {  'Content-Type': 'application/json' },
                body: JSON.stringify({ id :form.id })
            })

             await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {  'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            
            // localStorage.setItem(
            //     'passwords',
            //     JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
            // );
            setform({ site: '', username: '', password: '' })
            toast.success('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Please fill all the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("editing password with id ", id);
        setform({...passwordArray.filter((item) => item.id === id)[0], id: id})
        deletePassword(id)


    }

    const deletePassword =  async(id) => {
        console.log("deleting password with id ", id);

        if (confirm("Are you sure you want to delete this password?")) {
            setpasswordArray(passwordArray.filter((item) => item.id !== id))

            let res = await fetch('http://localhost:3000/', {
                method: 'DELETE',
                headers: {  'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
        
            // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter((item) => item.id !== id)))

            toast.success('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: "Bounce",
            });
        }


    }

    const handlechange = (e) => {
        const { name, value } = e.target;
        setform({ ...form, [name]: value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            // transition = "Bounce"
            />

            <div>
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-50 via-pink-100 to-green-100"></div>
                <div className="mx-auto max-w-full md:max-w-3xl p-2 md:p-8">
                    <h1 className='text-2xl md:text-4xl font-extrabold text-center mb-2 tracking-tight drop-shadow'>
                        <span className='text-green-500'>&lt;</span>
                        <span>Pass</span><span className='text-green-500'>Op/&gt;</span>
                    </h1>
                    <p className='text-green-900 text-base md:text-lg text-center mb-6 md:mb-8 font-medium'>Your own Password Manager</p>
                    <div className="flex flex-col gap-4 md:gap-6 items-center bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-10 border border-green-100 w-full">
                        <input
                            value={form.site}
                            onChange={handlechange}
                            placeholder='Enter Website URL'
                            className='rounded-xl border border-green-400 text-black px-4 py-2 md:py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-300 transition shadow-sm'
                            type="text"
                            name='site'
                            id='site'
                        />
                        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6">
                            <input
                                value={form.username}
                                onChange={handlechange}
                                placeholder='Enter Username'
                                className='rounded-xl border border-green-400 text-black px-4 py-2 md:py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-300 transition shadow-sm'
                                type="text"
                                name='username'
                                id='username'
                            />
                            <div className="relative w-full">
                                <input
                                    ref={passwordRef}
                                    value={form.password}
                                    onChange={handlechange}
                                    placeholder='Enter Password'
                                    className='rounded-xl border border-green-400 text-black px-4 py-2 md:py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-300 transition shadow-sm'
                                    type="password"
                                    name='password'
                                    id='password'
                                />
                                <span className='absolute right-2 top-2 cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} className='p-1 hover:scale-110 transition' width={26} src="icons/eye.png" alt="Show/Hide Password" />
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={savePassword}
                            className='flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 rounded-xl px-6 md:px-8 py-2 md:py-3 hover:from-green-300 hover:to-green-400 transition cursor-pointer font-semibold text-white shadow-lg w-full md:w-auto justify-center'
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover">
                            </lord-icon>
                            Save
                        </button>
                    </div>

                    <div className="passwords bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-green-100 w-full">
                        <h2 className='font-bold text-lg md:text-2xl py-2 mb-4 md:mb-6 text-green-700'>Your Passwords</h2>
                        {passwordArray.length === 0 &&
                            <div className="text-center text-gray-400 py-8 md:py-12 text-base md:text-lg">No Passwords Saved</div>
                        }
                        {passwordArray.length !== 0 &&
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full rounded-lg overflow-hidden mb-4 md:mb-6 border border-green-200 shadow-sm text-sm md:text-base">
                                    <thead className='bg-green-700 text-white'>
                                        <tr>
                                            <th className='py-2 md:py-3 px-2 md:px-3 font-semibold'>Site</th>
                                            <th className='py-2 md:py-3 px-2 md:px-3 font-semibold'>Username</th>
                                            <th className='py-2 md:py-3 px-2 md:px-3 font-semibold'>Password</th>
                                            <th className='py-2 md:py-3 px-2 md:px-3 font-semibold'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-50'>
                                        {passwordArray.map((item, index) => (
                                            <tr key={item.id} className='odd:bg-green-100 even:bg-green-50 border-b border-green-200'>
                                                <td className='py-2 px-2 text-center w-32 truncate'>
                                                    <a
                                                        href={item.site.startsWith('http://') || item.site.startsWith('https://') ? item.site : `https://${item.site}`}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className="text-green-700 underline hover:text-green-900 transition"
                                                    >
                                                        {item.site}
                                                    </a>
                                                </td>
                                                <td className='py-2 px-2 text-center w-32 truncate'>{item.username}</td>
                                                <td className='py-2 px-2 text-center w-32 truncate'>{item.password}</td>
                                                <td className='py-2 px-2 w-32'>
                                                    <div className="flex items-center justify-center gap-2 md:gap-3 h-full">
                                                        <span className='cursor-pointer hover:scale-110 transition' onClick={() => { editPassword(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover"
                                                            ></lord-icon>
                                                        </span>
                                                        <span className='cursor-pointer hover:scale-110 transition' onClick={() => { deletePassword(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                                trigger="hover"
                                                            ></lord-icon>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


export default Manager