import React from 'react';

const commentList = () =>{
	 <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
}

const commentForm = () => {
	<form className="commentForm">
        <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Say something..." />
        <input type="submit" value="Post" />
      </form>
}

const comment = () => {
 	<div className="comment">
	    <h2 className="commentAuthor">
	      {this.props.author}
	    </h2>
	    {this.props.children}
     </div>
}

const commentBox = () => { 
  <div className="commentBox">
    Hello, world! I am a CommentBox.
  </div>
}

export default commentBox;