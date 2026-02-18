import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogArticles } from "@/data/blogs";
import BlogSidebar from "./BlogSidebar";
export default function Blogs2() {
  return (
    <section className="section-blog-list tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-8">
            <div className="wrap-blog-list">
              {blogArticles.map((article, index) => (
                <div
                  key={index}
                  className="article-blog-item hover-img wow fadeInUp"
                >
                  <div className="image-wrap">
                    <Image
                      className="lazyload"
                      data-src={article.img}
                      src={article.img}
                      alt=""
                      width={article.width}
                      height={article.height}
                    />
                  </div>
                  <div className="content">
                    <h4 className="title">
                      <Link href={`/blog-single/${article.id}`}>
                        {article.title}
                      </Link>
                    </h4>
                    <ul className="meta">
                      <li>
                        <i className="icon-file" />
                        <a href="#">Lottery Guides</a>
                      </li>
                      <li>{article.date}</li>
                    </ul>
                    <p>{article.description}</p>
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
          <div className="col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
