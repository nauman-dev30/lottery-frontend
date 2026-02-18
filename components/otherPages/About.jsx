import React from "react";
import Image from "next/image";
export default function About() {
  return (
    <section className="s-about tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="wrap-about-us">
              <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                pretium fringilla fringilla. Integer facilisis porta lorem, nec
                vestibulum arcu posuere vel. Orci varius natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Ut blandit
                egestas lacinia. Phasellus odio magna, vulputate quis dignissim
                id, rutrum ac mauris. Proin pharetra facilisis turpis non
                luctus. Praesent volutpat aliquam imperdiet.
              </p>
              <div className="wrap-image">
                <Image
                  className="lazyload"
                  data-src="/images/section/about-1.jpg"
                  alt=""
                  width={1110}
                  height={624}
                  src="/images/section/about-1.jpg"
                />
              </div>
              <div className="blockquote">
                <div className="wrap-paragraph">
                  <p className="paragraph-1">
                    We are an online lottery ticket messenger service providing
                    customers with the opportunity to play the biggest lottery
                    draws, with official lottery tickets, from anywhere in the
                    world
                  </p>
                  <p className="paragraph-2">
                    As an independent third-party ticket purchasing service, we
                    have been leading the online lottery industry since 2002,
                    serving as the industry standard with a stellar reputation
                    and professional 24/7 customer service.
                  </p>
                  <div className="info">
                    <div className="avatar">
                      <Image
                        alt=""
                        width={180}
                        height={180}
                        src="/images/avatar/about-1.jpg"
                      />
                    </div>
                    <div className="content">
                      <div className="name">
                        <a href="#">John F. Davis</a>
                      </div>
                      <p>Founder &amp; CEO at Tronado.</p>
                    </div>
                  </div>
                </div>
                <div className="item-2">
                  <svg
                    width={65}
                    height={57}
                    viewBox="0 0 65 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 28.5V56.3572H27.8572V28.5H9.28578C9.28578 18.2599 17.6171 9.92861 27.8572 9.92861V0.642822C12.4958 0.642822 0 13.1386 0 28.5ZM65 9.92861V0.642822C49.6386 0.642822 37.1428 13.1386 37.1428 28.5V56.3572H65V28.5H46.4286C46.4286 18.2599 54.7599 9.92861 65 9.92861Z"
                      fill="#FE8C45"
                    />
                  </svg>
                </div>
              </div>
              <div className="item-1">
                <Image
                  alt=""
                  width={224}
                  height={247}
                  src="/images/item/about-1.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
