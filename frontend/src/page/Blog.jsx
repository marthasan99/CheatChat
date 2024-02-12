// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

const Blog = () => {
  let [like, setLike] = useState(false);
  let navigate = useNavigate();

  let data = useSelector((e) => e.user.userInfo);

  useEffect(() => {
    if (data === "logout") {
      navigate("/");
    }
  }, [data]);

  useEffect(() => {
    socket.emit("some", "some data show");
  }, [data]);

  return (
    <div>
      <div>
        <div>
          <section className="bg-white ">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 ">
                  Latest Blog
                </h2>
                <p className="font-light text-gray-500 sm:text-xl">
                  We use an agile approach to test assumptions and connect with
                  the needs of your audience early and often.
                </p>
              </div>
              <div className="grid gap-8 ">
                <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md  ">
                  <div className="flex justify-between items-center mb-5 text-gray-500">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                      <svg
                        className="mr-1 w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                      </svg>
                      Tutorial
                    </span>
                    <span className="text-sm cursor-pointer">
                      View all comment
                    </span>
                  </div>

                  <div className="border p-4 my-4">
                    <img
                      className="h-[600px] w-full object-cover"
                      src="blog01.avif"
                      alt=""
                    />
                  </div>

                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    <a href="#">How to quickly deploy a static website</a>
                  </h2>
                  <p className="mb-5 font-light text-gray-500 ">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Animi qui veritatis dolorum quo voluptatibus quod quaerat
                    modi adipisci, deserunt suscipit tempora, voluptates vero
                    eaque rem fugiat possimus minima perspiciatis omnis
                    aspernatur iure cumque? Sit, officiis totam, adipisci illum
                    accusamus molestias qui quae voluptatibus possimus itaque
                    minima earum rerum et culpa iste soluta obcaecati pariatur
                    enim, aspernatur eligendi? Pariatur necessitatibus ipsa
                    fugit molestias laboriosam natus reiciendis ex neque alias
                    eligendi ab totam commodi modi adipisci labore soluta
                    quaerat magni voluptatem veniam dolorem consequatur animi
                    fugiat, voluptate sunt. Obcaecati, nihil maxime? Incidunt,
                    commodi aliquid? Explicabo voluptatem laudantium, rerum
                    consectetur officia accusantium sunt?
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      {like ? (
                        <AiOutlineLike
                          className="text-2xl cursor-pointer"
                          onClick={() => setLike(!like)}
                        />
                      ) : (
                        <AiFillLike
                          className="text-2xl cursor-pointer"
                          onClick={() => setLike(!like)}
                        />
                      )}
                    </div>
                    <div>
                      <form>
                        <label
                          htmlFor="chat"
                          className="sr-only"
                        >
                          Your message
                        </label>
                        <div className="flex items-center  ">
                          <textarea
                            id="chat"
                            rows="1"
                            className="block mx-4 p-2.5 w-[350px] text-sm text-gray-900 outline-none bg-white rounded-lg border border-gray-300    "
                            placeholder="Your message..."
                          ></textarea>
                          <button
                            type="submit"
                            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100  "
                          >
                            <svg
                              className="w-5 h-5 rotate-90 rtl:-rotate-90"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                            <span className="sr-only">Send message</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Blog;
