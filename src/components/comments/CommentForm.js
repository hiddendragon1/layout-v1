import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    color:'white'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
});

class CommentForm extends React.Component {

	constructor() {
	  super();
	  this.state ={
	 	author: '',
	 	text: ''
	  }
	  this.handleAuthor = this.handleAuthor.bind(this);
	  this.handleText = this.handleText.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleAuthor(e) {
		this.setState({
			author: e.target.value
		});
	}

	handleText(e) {
		this.setState({
			text: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		// var author = this.state.author.trim();
	    var text = this.state.text.trim();
	    if (!text) {
	      return;
	    }
	    this.props.onAddComment({author: "author", text: text});
	    this.setState({author: '', text: ''});
	}

	render() {
		const {classes} = this.props
	  return (
		<form className={classes.container} onSubmit={this.handleSubmit}>
		    <TextField
		    	multiline
		    	rows="2"
		    	required
		    	fullWidth
		    	label="Comments"
		    	placeholder="Write Your Reply Here..." 
	    		value={this.state.text} 
	    		onChange={this.handleText}
	    		margin="dense"
	    		className={classes.textField}/>
		    <TextField type="submit" value="Post" />
		</form>
	  );
	}
}

export default withStyles(styles, {withTheme:true})(CommentForm);