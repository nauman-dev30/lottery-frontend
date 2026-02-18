import React from "react";
import Image from "next/image";
import { members } from "@/data/team";

export default function Members() {
  return (
    <section className="section-member-rattings tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <h2 className="title mb-6 wow fadeInUp">Member ratings</h2>
              <p className="sub-title wow fadeInUp fs-14">
                We always update the members who receive the highest monthly
                income here
              </p>
            </div>
            <div className="grid-column-4">
              {members.slice(0, 4).map((member, index) => (
                <div
                  key={member.id}
                  className="member-item hover-img wow fadeInUp"
                  data-wow-delay={member.delay}
                >
                  <div className="image-wrap">
                    <p className="number text-color-clip style-3">
                      {member.number}
                    </p>
                    <Image
                      className="lazyload"
                      data-src={member.image}
                      alt=""
                      src={member.image}
                      width={381}
                      height={396}
                    />
                  </div>
                  <div className="content">
                    <div className="name">
                      <a href="#">{member.name}</a>
                    </div>
                    <p>{member.position}</p>
                    <ul className="tf-social">
                      <li>
                        <a href="#">
                          <i className="icon-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
