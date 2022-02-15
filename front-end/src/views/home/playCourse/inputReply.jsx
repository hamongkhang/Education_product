import React from 'react';

const InputReply = ({ handleInputReply, onChange, onSubmit }) => {
    return (
        <div className="flex space-x-3 mx-3 mt-2">
            <img
                src={`${window.location.origin}/assets/images/slider/city.jpg`}
                className="rounded-full w-8 h-8  object-cover"
                alt=""
            />
            <form action="#" onSubmit={onSubmit} className="w-full">
                <div className="w-full">
                    <input
                        type="text"
                        className="border-b-2 block w-full sm:w-96 md:w-508 border-gray-300 outline-none py-1"
                        placeholder="Bình luận công khai..."
                        onChange={onChange}
                    />
                </div>
                <div className="text-right space-x-3 mt-3 w-full md:w-508">
                    <button
                        type="button"
                        className="hover:bg-gray-200 font-semibold text-gray-500 duration-200 rounded px-3 py-1 uppercase"
                        onClick={handleInputReply}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="rounded font-semibold px-3 py-1 uppercase bg-yellow-400 hover:bg-yellow-500 text-white"
                    >
                        Bình luận
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InputReply;
