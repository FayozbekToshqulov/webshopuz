import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, firestorege } from '../firebase';
import { useState, useEffect, Fragment } from "react";
import { v4 as uuidv4 } from 'uuid';
import { notification } from 'antd';
import { NavLink } from "react-router-dom";
import CEO from '../img/myimg.jpg';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";




function Aboutp() {
    const [blog, setBlog] = useState([]);
    const [matn, setMatn] = useState(['']);
    const [title, setTitle] = useState(['']);
    const [img, setImg] = useState(['']);
    const [instagram, setInstagram] = useState(['']);
    const [telegram, setTelegram] = useState(['']);
    const [phonenumber, setPhonenumber] = useState(['']);
    const [show, setShow] = useState(true);
    const [id, setId] = useState('');


    useEffect(() => {
        let data = collection(db, 'aboutcrud')


        onSnapshot(
            data, (snapshot) => {
                let malumot = [];

                snapshot.docs.forEach((doc) => {
                    malumot.push({ ...doc.data(), id: doc.id })
                });
                setBlog(malumot);
            }
        )
    }, []);

    const database = collection(db, "aboutcrud")

    const cartCreate = async (e) => {

        if (img == "" || matn == "" || title == "" || instagram == "" || telegram == "" || phonenumber == "") {
            return notification.error({
                message: "Ma'lumotni to'liq kiriting !",
                description: "Inputlarga hamma ma'lumotni to'liq kiriting ! Bitta ham Input bo'sh qolmasin !"
            })
        }
        else {
            e.preventDefault();

            await addDoc(database, {
                img: img,
                instagram: instagram,
                telegram: telegram,
                phonenumber: phonenumber,
                matn: matn,
                title: title,
                id: uuidv4()
            });

            notification.success({
                message: "Ma'lumotni yuborildi !",
                description: "Xavotir olmang hamma ma'lumotlaringiz to'liq va xafsiz yuborildi !"
            });

            setImg("");
            setInstagram("");
            setTelegram("");
            setPhonenumber("");
            setMatn("");
            setTitle("");
        }

        window.location.reload();

    };

    const cartDelete = async (id) => {
        const deletePost = doc(db, "aboutcrud", id);
        await deleteDoc(deletePost);
        console.log(id);
    }

    const cartEdit = async (img, instagram, telegram, phonenumber, title, matn, id) => {
        setImg(img);
        setInstagram(instagram);
        setTelegram(telegram);
        setPhonenumber(phonenumber);
        setTitle(title);
        setMatn(matn);
        setId(id);
        setShow(false);

    }

    const cartUpdate = async () => {
        const updateData = doc(db, 'aboutcrud', id);
        await updateDoc(updateData, { img, instagram, telegram, phonenumber, matn, title });

        if (img == "" || matn == "" || title == "" || instagram == "" || telegram == "" || phonenumber == "") {
            return notification.error({
                message: "Ma'lumotni to'liq kiriting !",
                description: "Inputlarga hamma ma'lumotni to'liq kiriting ! Bitta ham Input bo'sh qolmasin !"
            })
        }
        else {

            notification.success({
                message: "Ma'lumotni yuborildi !",
                description: "Xavotir olmang hamma ma'lumotlaringiz to'liq va xafsiz yuborildi !"
            });

            setImg("");
            setInstagram("");
            setTelegram("");
            setPhonenumber("");
            setMatn("");
            setTitle("");
        }

        window.location.reload();
    }

    const handleUpload = (e) => {
        console.log(e.target.files[0].name);
        const img = e.target.files[0]
        const imgRef = ref(firestorege, `user/${img.name}`)
        uploadBytes(imgRef, img).then((data) => {
            console.log(data);
            getDownloadURL(data.ref).then(val =>
                setImg(val)
            )
        })
    }


    return (

        <div>
            <div className='bg-black h-[155px] max-sm:pt-10 max-sm:h-[22%]'>
                <nav className='p-1 max-w-[98%] flex mt-[5%] mx-auto'>
                    <div>
                        <img className='max-sm:w- w-24 h-24 rounded-full border-4 border-white m-3' src={CEO} alt="" />
                        <p className='text-center font-sans text-white'>Islom Qodirov</p>
                    </div>
                    <ul className='max-sm:mt-4 mr-3 text-right max-sm:block flex flex-wrap gap-10 m-auto text-white text-[20px] font-medium'>
                        <li><NavLink to="/adminpanel" >Home</NavLink></li>
                        <li><NavLink to="/dashboard">Shop CRUD</NavLink></li>
                        <li><NavLink to="/aboutp">About CRUD</NavLink></li>
                        <li><NavLink to="/orders">Orders</NavLink></li>
                    </ul>
                </nav>
            </div>

            <h2 className="text-red-600"></h2>

            {/* CRUD */}

            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">About CRUD</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Title</label>
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600 w-full m-auto items-center flex justify-around flex-col h-[70px]"><FaImage className="text-[30px] cursor-pointer" /></label>
                                    <input
                                        onChange={(e) => handleUpload(e)}
                                        type="file"
                                        id="name"
                                        name="name"
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Instagram</label>
                                    <input
                                        value={instagram}
                                        onChange={(e) => setInstagram(e.target.value)}
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Telegram</label>
                                    <input
                                        value={telegram}
                                        onChange={(e) => setTelegram(e.target.value)}
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Phone Number</label>
                                    <input
                                        value={phonenumber}
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">Complete information</label>
                                    <textarea
                                        value={matn}
                                        onChange={(e) => setMatn(e.target.value)}
                                        id="message"
                                        name="message"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2  m-auto">
                                {show ? <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={cartCreate}>Create</button> : <button className="boder px-4 py-2 mt-2 mb-6 bg-green-400 text-white rounded" onClick={cartUpdate}>Update</button>}
                                <br /><br />

                            </div>
                            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                <a className="text-indigo-500">example@email.com</a>
                                <p className="leading-normal my-5">49 Smith St.
                                    <br />Saint Cloud, MN 56301
                                </p>
                                <span className="inline-flex">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-4 text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-4 text-gray-500">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-4 text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <div className="flex flex-col">
                    <div>
                        <hr className="border-black mb-3" />
                        <div className="font-bold text-blue-500 flex justify-between mx-3">
                            <h1>Img</h1>
                            <h1>Name</h1>
                            <h1>Edit</h1>
                            <h1>Delete</h1>
                        </div>
                        <hr className="border-black mt-3" />
                    </div>
                    <div className="flex flex-wrap -m-[-1%]">
                        {blog.map((item, index) => (
                            <Fragment key={index}>
                                <div className="mt-3 w-[100%] flex justify-between items-center mb-3">
                                    <img className="w-[10%] h-[70%]" name="img" id="img" src={item.img} alt="" />
                                    <b className="w-[10%] ml-[-5%] text-center" name="nameprodust" id="nameprodust">{item.title}</b>

                                    <FiEdit className="text-[25px] text-blue-500 w-16 text-center cursor-pointer" onClick={() => cartEdit(item.img, item.instagram, item.telegram, item.phonenumber, item.title, item.matn, item.id,)} />
                                    <MdDelete className="text-[25px] text-blue-500 w-16 text-center cursor-pointer" onClick={() => cartDelete(item.id)} />
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Aboutp


