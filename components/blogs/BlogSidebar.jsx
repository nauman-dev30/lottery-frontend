"use client";
import { featuredPosts } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogSidebar() {
  return (
    <div className="tf-sidebar">
      <div className="sidebar-search">
        <h4 className="heading">Search blog</h4>
        <form
          action="#"
          onSubmit={(e) => e.preventDefault()}
          className="form-search"
        >
          <button className="button-submit" type="submit">
            <i className="icon-search" />
          </button>
          <fieldset>
            <input type="text" placeholder="Search..." required />
          </fieldset>
        </form>
      </div>
      <div className="sidebar-category">
        <h4 className="heading">Categories</h4>
        <ul className="category-list">
          <li className="item">
            <a href="#">All post</a>
            <p className="item-quatity">(50)</p>
          </li>
          <li className="item">
            <a href="#">Lottery Guides </a>
            <p className="item-quatity">(34)</p>
          </li>
          <li className="item">
            <a href="#">Lottery story </a>
            <p className="item-quatity">(69)</p>
          </li>
          <li className="item">
            <a href="#">Our winner </a>
            <p className="item-quatity">(25)</p>
          </li>
          <li className="item">
            <a href="#">Magazine </a>
            <p className="item-quatity">(12)</p>
          </li>
        </ul>
      </div>
      <div className="sidebar-feature">
        <h4 className="heading mb-20">Featured listings</h4>
        <ul className="feature-post-list">
          {featuredPosts.map((post, index) => (
            <li key={index} className="item">
              <div className="image">
                <Image
                  alt=""
                  src={post.img}
                  width={post.width}
                  height={post.height}
                />
              </div>
              <div className="content">
                <Link href={`/blog-single/${post.id}`} className="title">
                  {post.title}
                </Link>
                <div className="date-up">
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
                  <p className="day">{post.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-join-our">
        <h4 className="heading mb-20">Join our newsletter</h4>
        <p className="sub-title">
          Signup to be the first to hear about exclusive deals, special offers
          and upcoming collections
        </p>
        <form
          action="#"
          onSubmit={(e) => e.preventDefault()}
          className="form-email style-2"
        >
          <fieldset>
            <input type="email" placeholder="Enter your email" required />
          </fieldset>
          <button className="button-submit">
            <i className="icon-send-message" />
          </button>
        </form>
      </div>
      <div className="sidebar-tag">
        <h4 className="heading mb-20">Popular Tags</h4>
        <ul className="tag-list">
          <li className="item">
            <a href="#">Lotto</a>
          </li>
          <li className="item">
            <a href="#">Lottery</a>
          </li>
          <li className="item">
            <a href="#">Ultimate</a>
          </li>
          <li className="item">
            <a href="#">Guide</a>
          </li>
          <li className="item">
            <a href="#">Playing</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
