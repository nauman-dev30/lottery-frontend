"use client";

export default function CommentForm() {
  return (
    <div className="add-comment-wrap">
      <p className="title">Leave a comment</p>
      <p className="sub-title">
        Your email address will not be published. Required fields are marked *
      </p>
      <form
        action="#"
        onSubmit={(e) => e.preventDefault()}
        className="form-add-comment"
      >
        <div className="cols">
          <fieldset className="tf-field">
            <label htmlFor="field1">Your name *</label>
            <input
              className="tf-input"
              type="text"
              id="field1"
              placeholder="Your name"
              required
            />
          </fieldset>
        </div>
        <div className="cols">
          <fieldset>
            <label htmlFor="field4">Email address</label>
            <input type="email" id="field4" placeholder="Your email" />
          </fieldset>
          <fieldset>
            <label htmlFor="field2">Phone number</label>
            <input type="number" id="field2" placeholder="Your phone" />
          </fieldset>
        </div>
        <fieldset>
          <label htmlFor="field3">Your Comment</label>
          <textarea id="field3" placeholder="Your message" defaultValue={""} />
        </fieldset>
        <div className="btn-send-comment">
          <button className="tf-btn">
            Send comment <i className="icon-right" />
          </button>
        </div>
      </form>
    </div>
  );
}
