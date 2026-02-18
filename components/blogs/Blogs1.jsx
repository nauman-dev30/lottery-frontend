import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
export default function Blogs1() {
  return (
    <section className="section-blog-grid tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="grid-layout-3">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="article-blog-item style-grid hover-img wow fadeInUp"
                  data-wow-delay={post.delay}
                >
                  <div className="image-wrap">
                    <Image
                      className="lazyload"
                      data-src={post.img}
                      src={post.img}
                      alt=""
                      width={post.width}
                      height={post.height}
                    />
                  </div>
                  <div className="content">
                    <ul className="meta">
                      <li>
                        <i className="icon-file" />
                        <a href="#">Lottery Guides</a>
                      </li>
                      <li>January 30</li>
                    </ul>
                    <h4 className="title">
                      <Link href={`/blog-single/${post.id}`}>{post.title}</Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
            <ul className="wg-pagination">
              <li>
                <a href="#">
                  <i className="icon-back" />
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li className="active">
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">4</a>
              </li>
              <li>
                <a href="#">...</a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-next" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
