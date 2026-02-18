import React from "react";
import Image from "next/image";
import BlogSidebar from "./BlogSidebar";
import CommentForm from "./CommentForm";
export default function BlogSingle({ blog }) {
  return (
    <section className="s-page-blog-single tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-8">
            <div className="blog-single-main">
              <h2 className="main-title wow fadeInUp" data-wow-delay="0s">
                {blog.title}
              </h2>
              <div className="entry-meta">
                <div className="entry-user">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4993 4C10.4993 4.66304 10.2359 5.29893 9.7671 5.76777C9.29826 6.23661 8.66237 6.5 7.99933 6.5C7.33629 6.5 6.70041 6.23661 6.23157 5.76777C5.76273 5.29893 5.49933 4.66304 5.49933 4C5.49933 3.33696 5.76273 2.70107 6.23157 2.23223C6.70041 1.76339 7.33629 1.5 7.99933 1.5C8.66237 1.5 9.29826 1.76339 9.7671 2.23223C10.2359 2.70107 10.4993 3.33696 10.4993 4ZM3 13.412C3.02142 12.1002 3.55756 10.8494 4.49278 9.92936C5.42801 9.00929 6.68739 8.49365 7.99933 8.49365C9.31127 8.49365 10.5707 9.00929 11.5059 9.92936C12.4411 10.8494 12.9772 12.1002 12.9987 13.412C11.4303 14.1312 9.72477 14.5023 7.99933 14.5C6.21533 14.5 4.522 14.1107 3 13.412Z"
                      stroke="#7791BA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a href="#">Kathryn Murphy</a>
                </div>
                <div className="entry-category">
                  <i className="icon-file" />
                  <a href="#">Housing</a>
                </div>
                <div className="entry-comment">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.75 6.5C5.75 6.56631 5.72366 6.62989 5.67678 6.67678C5.62989 6.72366 5.5663 6.75 5.5 6.75C5.4337 6.75 5.37011 6.72366 5.32322 6.67678C5.27634 6.62989 5.25 6.56631 5.25 6.5C5.25 6.4337 5.27634 6.37011 5.32322 6.32322C5.37011 6.27634 5.4337 6.25 5.5 6.25C5.5663 6.25 5.62989 6.27634 5.67678 6.32322C5.72366 6.37011 5.75 6.4337 5.75 6.5ZM5.75 6.5H5.5M8.25 6.5C8.25 6.56631 8.22366 6.62989 8.17678 6.67678C8.12989 6.72366 8.0663 6.75 8 6.75C7.9337 6.75 7.87011 6.72366 7.82322 6.67678C7.77634 6.62989 7.75 6.56631 7.75 6.5C7.75 6.4337 7.77634 6.37011 7.82322 6.32322C7.87011 6.27634 7.9337 6.25 8 6.25C8.0663 6.25 8.12989 6.27634 8.17678 6.32322C8.22366 6.37011 8.25 6.4337 8.25 6.5ZM8.25 6.5H8M10.75 6.5C10.75 6.56631 10.7237 6.62989 10.6768 6.67678C10.6299 6.72366 10.5663 6.75 10.5 6.75C10.4337 6.75 10.3701 6.72366 10.3232 6.67678C10.2763 6.62989 10.25 6.56631 10.25 6.5C10.25 6.4337 10.2763 6.37011 10.3232 6.32322C10.3701 6.27634 10.4337 6.25 10.5 6.25C10.5663 6.25 10.6299 6.27634 10.6768 6.32322C10.7237 6.37011 10.75 6.4337 10.75 6.5ZM10.75 6.5H10.5M1.5 8.50667C1.5 9.57333 2.24867 10.5027 3.30467 10.658C4.02933 10.7647 4.76133 10.8467 5.5 10.904V14L8.28933 11.2113C8.42744 11.0738 8.61312 10.9945 8.808 10.99C10.1091 10.958 11.407 10.8471 12.6947 10.658C13.7513 10.5027 14.5 9.574 14.5 8.506V4.494C14.5 3.426 13.7513 2.49733 12.6953 2.342C11.1406 2.11381 9.57135 1.99951 8 2C6.40533 2 4.83733 2.11667 3.30467 2.342C2.24867 2.49733 1.5 3.42667 1.5 4.494V8.506V8.50667Z"
                      stroke="#7791BA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>0 Comment</span>
                </div>
                <div className="entry-date">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 2V3.5M11.5 2V3.5M2 12.5V5C2 4.60218 2.15804 4.22064 2.43934 3.93934C2.72064 3.65804 3.10218 3.5 3.5 3.5H12.5C12.8978 3.5 13.2794 3.65804 13.5607 3.93934C13.842 4.22064 14 4.60218 14 5V12.5M2 12.5C2 12.8978 2.15804 13.2794 2.43934 13.5607C2.72064 13.842 3.10218 14 3.5 14H12.5C12.8978 14 13.2794 13.842 13.5607 13.5607C13.842 13.2794 14 12.8978 14 12.5M2 12.5V7.5C2 7.10218 2.15804 6.72064 2.43934 6.43934C2.72064 6.15804 3.10218 6 3.5 6H12.5C12.8978 6 13.2794 6.15804 13.5607 6.43934C13.842 6.72064 14 7.10218 14 7.5V12.5"
                      stroke="#7791BA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>April 6, 2023</span>
                </div>
              </div>
              <p className="text">
                Intestinal parasites like tapeworms are common in cats and can
                be treated safely with help from a <br />
                vet. Here's how to tell if your cat has tapeworms and how to get
                rid of them quickly and effectively.
              </p>
              <div className="entry-image">
                <div className="image">
                  <Image alt="" src={blog.img} width={730} height={411} />
                </div>
                <div className="sub-image">
                  PHOTO:
                  <a href="#"> DAUGIRDAS TOMAS RACYS</a>/<a href="#"> GETTY </a>
                </div>
              </div>
              <p className="decs">
                Tapeworms are a common intestinal parasite in cats that they get
                from eating either infected fleas or infected small animals. The
                worms are divided into segments that break off and look similar
                to grains of rice moving around in the cat's poop. Luckily, the
                worms rarely cause disease in cats, and both treatment and
                prevention are relatively simple.
              </p>
              <div className="block-quote wow fadeInUp" data-wow-delay="0s">
                <p className="text-quote">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Morbi purus purus, tempus sit amet egestas non, malesuada nec
                  odio. Sed laoreet cursus velit, convallis varius quam iaculis
                  eu. Aenean posuere efficitur ullamcorper. Quisque elit urna,
                  vulputate eget convallis eget, malesuada id diam.”
                </p>
                <p className="author-said">
                  said Mike Fratantoni, MBA’s chief economist.
                </p>
              </div>
              <p className="decs-1">
                Orci varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Vestibulum mattis lobortis mauris,
                pharetra molestie eros.
              </p>
              <p className="decs-2">
                Nunc ac elit mauris. Integer vel mi gravida orci pharetra
                fringilla.
              </p>
              <p className="decs-3">
                Nam commodo eros eget nibh pretium gravida. Praesent a erat
                convallis, maximus tortor a, consectetur nulla. In hac habitasse
                platea dictumst. Morbi in faucibus lectus. Nulla finibus erat
                elit. Mauris vel nisi imperdiet, ultricies nibh tincidunt,
                sodales eros. Sed ut pellentesque nisl, vel elementum augue.
              </p>
              <p className="decs-4">
                Vestibulum arcu sapien, iaculis eu tempus et, fermentum vitae
                mi. Suspendisse dignissim, quam ac tincidunt auctor, metus
                tortor lobortis nisi, nec porttitor metus risus ut quam.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Nullam mattis lorem vitae
                felis lobortis tincidunt. Donec mollis mollis neque, id aliquet
                nulla finibus quis. Donec scelerisque libero enim, non aliquet
                purus consectetur id. Quisque ante tellus, bibendum varius
                rhoncus id, maximus at ex. Morbi sapien sem, condimentum at
                turpis eget, porta mattis nunc.
              </p>
              <div className="bottom">
                <div className="tags wow fadeInUp" data-wow-delay="0s">
                  <span>Tags:</span>
                  <ul className="list">
                    <li className="item">
                      <a href="#" className="type-secondary">
                        Personal
                      </a>
                    </li>
                    <li className="item">
                      <a href="#" className="type-secondary">
                        Playing
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="social wow fadeInUp" data-wow-delay="0.1s">
                  <span className="">Share this post:</span>
                  <ul className="list">
                    <li className="item">
                      <a href="#">
                        <i className="icon-facebook" />
                      </a>
                    </li>
                    <li className="item">
                      <a href="#">
                        <i className="icon-twitter" />
                      </a>
                    </li>
                    <li className="item">
                      <a href="#">
                        <i className="icon-linkedin2" />
                      </a>
                    </li>
                    <li className="item">
                      <a href="#">
                        <i className="icon-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="comment-wrap">
                <p className="title fs-24">Comment (4)</p>
                <div className="comment-item wow fadeInUp" data-wow-delay="0s">
                  <div className="image">
                    <Image
                      alt=""
                      src="/images/author/author-1.png"
                      width={128}
                      height={128}
                    />
                  </div>
                  <div className="content">
                    <div className="entry-name-date">
                      <a href="#" className="name">
                        Bessie Cooper
                      </a>
                      <p className="date-up">Nov 9, 2023 at 5:20 p.m</p>
                    </div>
                    <p className="text-comment">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec lectus arcu, finibus ac faucibus vel, congue sed
                      arcu. Suspendisse potenti. Morbi et sapien sapien.
                    </p>
                    <div className="reaction">
                      <div className="btn-like">
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.375 6.75H10.6875M4.66949 14.0625C4.66124 14.025 4.64849 13.9875 4.63049 13.9515C4.18724 13.0515 3.93749 12.039 3.93749 10.9687C3.93587 9.89238 4.19282 8.83136 4.68674 7.875M4.66949 14.0625C4.72649 14.3362 4.53224 14.625 4.23824 14.625H3.55724C2.89049 14.625 2.27249 14.2365 2.07824 13.599C1.82399 12.7665 1.68749 11.8837 1.68749 10.9687C1.68749 9.804 1.90874 8.69175 2.31074 7.67025C2.54024 7.08975 3.12524 6.75 3.74999 6.75H4.53974C4.89374 6.75 5.09849 7.167 4.91474 7.47C4.83434 7.60234 4.7578 7.73742 4.68674 7.875M4.66949 14.0625H5.63999C6.0027 14.0623 6.36307 14.1205 6.70724 14.235L9.04274 15.015C9.38691 15.1295 9.74728 15.1877 10.11 15.1875H13.122C13.5855 15.1875 14.0347 15.0022 14.3257 14.6407C15.6143 13.0434 16.3156 11.0523 16.3125 9C16.3125 8.6745 16.2952 8.35275 16.2615 8.03625C16.1797 7.2705 15.4905 6.75 14.721 6.75H12.3765C11.913 6.75 11.6332 6.207 11.8327 5.7885C12.191 5.03444 12.3763 4.20985 12.375 3.375C12.375 2.92745 12.1972 2.49823 11.8807 2.18176C11.5643 1.86529 11.135 1.6875 10.6875 1.6875C10.5383 1.6875 10.3952 1.74676 10.2897 1.85225C10.1843 1.95774 10.125 2.10082 10.125 2.25V2.72475C10.125 3.1545 10.0425 3.57975 9.88349 3.97875C9.65549 4.54875 9.18599 4.97625 8.64374 5.265C7.81128 5.7092 7.0807 6.32228 6.49874 7.065C6.12524 7.5405 5.57924 7.875 4.97474 7.875H4.68674"
                            stroke="#7791BA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Useful</span>
                      </div>
                      <div className="btn-dislike">
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.62501 11.25H7.31251M13.3305 3.9375C13.3388 3.975 13.3515 4.0125 13.3695 4.0485C13.8128 4.9485 14.0625 5.961 14.0625 7.03125C14.0641 8.10762 13.8072 9.16864 13.3133 10.125M13.3305 3.9375C13.2735 3.66375 13.4678 3.375 13.7618 3.375H14.4428C15.1095 3.375 15.7275 3.7635 15.9218 4.401C16.176 5.2335 16.3125 6.11625 16.3125 7.03125C16.3125 8.196 16.0913 9.30825 15.6893 10.3298C15.4598 10.9103 14.8748 11.25 14.25 11.25H13.4603C13.1063 11.25 12.9015 10.833 13.0853 10.53C13.1657 10.3977 13.2422 10.2626 13.3133 10.125M13.3305 3.9375H12.36C11.9973 3.93772 11.6369 3.87948 11.2928 3.765L8.95726 2.985C8.61309 2.87053 8.25272 2.81228 7.89001 2.8125H4.87801C4.41451 2.8125 3.96526 2.99775 3.67426 3.35925C2.38572 4.95658 1.68441 6.94774 1.68751 9C1.68751 9.3255 1.70476 9.64725 1.73851 9.96375C1.82026 10.7295 2.50951 11.25 3.27901 11.25H5.62351C6.08701 11.25 6.36676 11.793 6.16726 12.2115C5.80897 12.9656 5.6237 13.7902 5.62501 14.625C5.62501 15.0726 5.8028 15.5018 6.11927 15.8182C6.43574 16.1347 6.86496 16.3125 7.31251 16.3125C7.46169 16.3125 7.60477 16.2532 7.71026 16.1477C7.81575 16.0423 7.87501 15.8992 7.87501 15.75V15.2753C7.87501 14.8455 7.95751 14.4203 8.11651 14.0213C8.34451 13.4513 8.81401 13.0238 9.35626 12.735C10.1887 12.2908 10.9193 11.6777 11.5013 10.935C11.8748 10.4595 12.4208 10.125 13.0253 10.125H13.3133"
                            stroke="#7791BA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Not helpful</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="comment-item wow fadeInUp" data-wow-delay="0s">
                  <div className="image">
                    <Image
                      alt=""
                      src="/images/author/author-2.png"
                      width={410}
                      height={410}
                    />
                  </div>
                  <div className="content">
                    <div className="entry-name-date">
                      <a href="#" className="name">
                        Wade Warren
                      </a>
                      <p className="date-up">Nov 9, 2023 at 5:20 p.m</p>
                    </div>
                    <p className="text-comment">
                      Nullam vestibulum bibendum laoreet. Integer in laoreet
                      elit. Nullam sagittis venenatis porta. Donec fringilla
                      justo non felis sollicitudin rutrum
                    </p>
                    <div className="reaction">
                      <div className="btn-like">
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.375 6.75H10.6875M4.66949 14.0625C4.66124 14.025 4.64849 13.9875 4.63049 13.9515C4.18724 13.0515 3.93749 12.039 3.93749 10.9687C3.93587 9.89238 4.19282 8.83136 4.68674 7.875M4.66949 14.0625C4.72649 14.3362 4.53224 14.625 4.23824 14.625H3.55724C2.89049 14.625 2.27249 14.2365 2.07824 13.599C1.82399 12.7665 1.68749 11.8837 1.68749 10.9687C1.68749 9.804 1.90874 8.69175 2.31074 7.67025C2.54024 7.08975 3.12524 6.75 3.74999 6.75H4.53974C4.89374 6.75 5.09849 7.167 4.91474 7.47C4.83434 7.60234 4.7578 7.73742 4.68674 7.875M4.66949 14.0625H5.63999C6.0027 14.0623 6.36307 14.1205 6.70724 14.235L9.04274 15.015C9.38691 15.1295 9.74728 15.1877 10.11 15.1875H13.122C13.5855 15.1875 14.0347 15.0022 14.3257 14.6407C15.6143 13.0434 16.3156 11.0523 16.3125 9C16.3125 8.6745 16.2952 8.35275 16.2615 8.03625C16.1797 7.2705 15.4905 6.75 14.721 6.75H12.3765C11.913 6.75 11.6332 6.207 11.8327 5.7885C12.191 5.03444 12.3763 4.20985 12.375 3.375C12.375 2.92745 12.1972 2.49823 11.8807 2.18176C11.5643 1.86529 11.135 1.6875 10.6875 1.6875C10.5383 1.6875 10.3952 1.74676 10.2897 1.85225C10.1843 1.95774 10.125 2.10082 10.125 2.25V2.72475C10.125 3.1545 10.0425 3.57975 9.88349 3.97875C9.65549 4.54875 9.18599 4.97625 8.64374 5.265C7.81128 5.7092 7.0807 6.32228 6.49874 7.065C6.12524 7.5405 5.57924 7.875 4.97474 7.875H4.68674"
                            stroke="#7791BA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Useful</span>
                      </div>
                      <div className="btn-dislike">
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.62501 11.25H7.31251M13.3305 3.9375C13.3388 3.975 13.3515 4.0125 13.3695 4.0485C13.8128 4.9485 14.0625 5.961 14.0625 7.03125C14.0641 8.10762 13.8072 9.16864 13.3133 10.125M13.3305 3.9375C13.2735 3.66375 13.4678 3.375 13.7618 3.375H14.4428C15.1095 3.375 15.7275 3.7635 15.9218 4.401C16.176 5.2335 16.3125 6.11625 16.3125 7.03125C16.3125 8.196 16.0913 9.30825 15.6893 10.3298C15.4598 10.9103 14.8748 11.25 14.25 11.25H13.4603C13.1063 11.25 12.9015 10.833 13.0853 10.53C13.1657 10.3977 13.2422 10.2626 13.3133 10.125M13.3305 3.9375H12.36C11.9973 3.93772 11.6369 3.87948 11.2928 3.765L8.95726 2.985C8.61309 2.87053 8.25272 2.81228 7.89001 2.8125H4.87801C4.41451 2.8125 3.96526 2.99775 3.67426 3.35925C2.38572 4.95658 1.68441 6.94774 1.68751 9C1.68751 9.3255 1.70476 9.64725 1.73851 9.96375C1.82026 10.7295 2.50951 11.25 3.27901 11.25H5.62351C6.08701 11.25 6.36676 11.793 6.16726 12.2115C5.80897 12.9656 5.6237 13.7902 5.62501 14.625C5.62501 15.0726 5.8028 15.5018 6.11927 15.8182C6.43574 16.1347 6.86496 16.3125 7.31251 16.3125C7.46169 16.3125 7.60477 16.2532 7.71026 16.1477C7.81575 16.0423 7.87501 15.8992 7.87501 15.75V15.2753C7.87501 14.8455 7.95751 14.4203 8.11651 14.0213C8.34451 13.4513 8.81401 13.0238 9.35626 12.735C10.1887 12.2908 10.9193 11.6777 11.5013 10.935C11.8748 10.4595 12.4208 10.125 13.0253 10.125H13.3133"
                            stroke="#7791BA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Not helpful</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="comment-item wow fadeInUp" data-wow-delay="0s">
                  <div className="image">
                    <Image
                      alt=""
                      src="/images/author/author-3.png"
                      width={128}
                      height={128}
                    />
                  </div>
                  <div className="content">
                    <div className="entry-name-date">
                      <a href="#" className="name">
                        Jenny Wilson
                      </a>
                      <p className="date-up">Nov 9, 2023 at 5:20 p.m</p>
                    </div>
                    <p className="text-comment">
                      Praesent porttitor leo orci, a efficitur nunc molestie a.
                      Etiam arcu eros, interdum quis nulla vel, venenatis
                      iaculis nibh
                    </p>
                    <div className="reaction">
                      <div className="btn-like">
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.375 6.75H10.6875M4.66949 14.0625C4.66124 14.025 4.64849 13.9875 4.63049 13.9515C4.18724 13.0515 3.93749 12.039 3.93749 10.9687C3.93587 9.89238 4.19282 8.83136 4.68674 7.875M4.66949 14.0625C4.72649 14.3362 4.53224 14.625 4.23824 14.625H3.55724C2.89049 14.625 2.27249 14.2365 2.07824 13.599C1.82399 12.7665 1.68749 11.8837 1.68749 10.9687C1.68749 9.804 1.90874 8.69175 2.31074 7.67025C2.54024 7.08975 3.12524 6.75 3.74999 6.75H4.53974C4.89374 6.75 5.09849 7.167 4.91474 7.47C4.83434 7.60234 4.7578 7.73742 4.68674 7.875M4.66949 14.0625H5.63999C6.0027 14.0623 6.36307 14.1205 6.70724 14.235L9.04274 15.015C9.38691 15.1295 9.74728 15.1877 10.11 15.1875H13.122C13.5855 15.1875 14.0347 15.0022 14.3257 14.6407C15.6143 13.0434 16.3156 11.0523 16.3125 9C16.3125 8.6745 16.2952 8.35275 16.2615 8.03625C16.1797 7.2705 15.4905 6.75 14.721 6.75H12.3765C11.913 6.75 11.6332 6.207 11.8327 5.7885C12.191 5.03444 12.3763 4.20985 12.375 3.375C12.375 2.92745 12.1972 2.49823 11.8807 2.18176C11.5643 1.86529 11.135 1.6875 10.6875 1.6875C10.5383 1.6875 10.3952 1.74676 10.2897 1.85225C10.1843 1.95774 10.125 2.10082 10.125 2.25V2.72475C10.125 3.1545 10.0425 3.57975 9.88349 3.97875C9.65549 4.54875 9.18599 4.97625 8.64374 5.265C7.81128 5.7092 7.0807 6.32228 6.49874 7.065C6.12524 7.5405 5.57924 7.875 4.97474 7.875H4.68674"
                            stroke="#7791BA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Useful</span>
                      </div>
                      <div className="btn-dislike">
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.62501 11.25H7.31251M13.3305 3.9375C13.3388 3.975 13.3515 4.0125 13.3695 4.0485C13.8128 4.9485 14.0625 5.961 14.0625 7.03125C14.0641 8.10762 13.8072 9.16864 13.3133 10.125M13.3305 3.9375C13.2735 3.66375 13.4678 3.375 13.7618 3.375H14.4428C15.1095 3.375 15.7275 3.7635 15.9218 4.401C16.176 5.2335 16.3125 6.11625 16.3125 7.03125C16.3125 8.196 16.0913 9.30825 15.6893 10.3298C15.4598 10.9103 14.8748 11.25 14.25 11.25H13.4603C13.1063 11.25 12.9015 10.833 13.0853 10.53C13.1657 10.3977 13.2422 10.2626 13.3133 10.125M13.3305 3.9375H12.36C11.9973 3.93772 11.6369 3.87948 11.2928 3.765L8.95726 2.985C8.61309 2.87053 8.25272 2.81228 7.89001 2.8125H4.87801C4.41451 2.8125 3.96526 2.99775 3.67426 3.35925C2.38572 4.95658 1.68441 6.94774 1.68751 9C1.68751 9.3255 1.70476 9.64725 1.73851 9.96375C1.82026 10.7295 2.50951 11.25 3.27901 11.25H5.62351C6.08701 11.25 6.36676 11.793 6.16726 12.2115C5.80897 12.9656 5.6237 13.7902 5.62501 14.625C5.62501 15.0726 5.8028 15.5018 6.11927 15.8182C6.43574 16.1347 6.86496 16.3125 7.31251 16.3125C7.46169 16.3125 7.60477 16.2532 7.71026 16.1477C7.81575 16.0423 7.87501 15.8992 7.87501 15.75V15.2753C7.87501 14.8455 7.95751 14.4203 8.11651 14.0213C8.34451 13.4513 8.81401 13.0238 9.35626 12.735C10.1887 12.2908 10.9193 11.6777 11.5013 10.935C11.8748 10.4595 12.4208 10.125 13.0253 10.125H13.3133"
                            stroke="#7791BA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Not helpful</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CommentForm />
            </div>
          </div>
          <div className="col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
