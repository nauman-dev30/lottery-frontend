import BlogSingle from "@/components/blogs/BlogSingle";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import { allBlogs } from "@/data/blogs";

import React from "react";

export const metadata = {
  title:
    "Blog Single || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;

  const blog = allBlogs.filter((p) => p.id == id)[0] || allBlogs[0];
  return (
    <>
      <Breadcumb pageName="Blog detail" title="Blog detail" />
      <div className="main-content page-blog-single">
        <BlogSingle blog={blog} />
        {/* <Cta /> */}
      </div>
    </>
  );
}
