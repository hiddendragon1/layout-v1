import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Stepper,  {StepLabel, Step, StepContent} from 'material-ui/Stepper';
import Button from 'material-ui/Button';


const styles = theme => ({
  dropZone: {
  	color: 'black',
  	background : 'white',
  	border: '1px rgb(102, 102, 102) solid',

    borderRadius: 5,
    '&:hover' : {
    	background: '#ccc',
    	cursor: 'pointer'
    }
  },
  dialogTitle: {
  	padding: 5,
  },
  diaglogContent: {
  	minWidth: 550,
  },
  textField: {
  	
  }

});


class NewPost extends React.Component {
	constructor() {
	  super();
	  this.state = {
	  	text: '', 
	  	files: [],
	  	filesPreview: '',
	  	open:false,
	  	activeStep: 0

	  };
	  this.handleTextPost = this.handleText.bind(this);
	  this.onDropFile = this.onDropFile.bind(this);
	  this.handleClose = this.handleClose.bind(this);
	  this.handleOpen = this.handleOpen.bind(this);
	  this.handleBack = this.handleBack.bind(this);
	  this.handleNext = this.handleNext.bind(this);
	  this.handleReset = this.handleReset.bind(this);
	}

	handleNext() {
		if(this.state.activeStep < 3 )
		    this.setState({
		      activeStep: this.state.activeStep + 1,
			});
		else
			console.log("handle post here");
	};

	handleBack() {
		this.setState({
		  activeStep: this.state.activeStep - 1,
		});
	};

	handleReset() {
		this.setState({
		  activeStep: 0,
		});
	};

	handleOpen() {
    	this.setState({ open: true });
	};

	handleClose() {
		this.setState({ open: false });
	};


	handleText(e) {
		this.setState({
			text: e.target.value
		});
	}

	onDropFile(file) {
		this.state.files.push(file);
		console.log(file);
		this.setState ({
			filesPreview : file[0].preview		
		});
	}

	getSteps() {
  		return ['Picture', 'Post', 'Category'];
	}

	render() {
		const {classes} = this.props;
		const { activeStep } = this.state;
		const steps = this.getSteps();
return (
 
   
 	<div>
	 	<TextField 
			label="What blazing today"
	    	placeholder="What are you on  today" 
	    	onClick={this.handleOpen}
	    	value="Post Here"
    	/>
 		<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"

        >
			<DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
				<DialogContentText> Enter Your Exiting news today! </DialogContentText>	
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map(label => {
						return (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
						);
					})}
				</Stepper>
			</DialogTitle>
 	  		<DialogContent className={classes.diaglogContent}>
 	  		   {activeStep == 1 ?	
				<TextField 
			    	fullWidth
			    	label="What blazing today"
			    	placeholder="What are you on  today" 
		    		value={this.state.text} 
		    		onChange={this.handleTextPost}
		    		className={classes.textField}
			    /> : ''}

			    {activeStep ==0 ?
		    	 <Dropzone
		            accept="image/jpeg, image/png, image/gif"
		            onDrop={this.onDropFile}
		            name="upload"
		            className={classes.dropZone}>
	          	 {this.state.filesPreview ? <img src={this.state.filesPreview} height="50%" width="100%"/> :
	          	 	<div>
						<p>Drag and Drop files here or click to select files to upload.</p>
						<p>Only *.jpeg and *.png and *.gif images will be accepted</p> 
					</div>} 
				 </Dropzone>: '' }
	          	<DialogActions>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}> 
                	Back
                </Button>
                <Button 
                  raised 
                  color="primary" 
                  onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Post' : 'Next'}
                </Button>
              </DialogActions>
	        </DialogContent>
	     </Dialog>
	</div>
          

		);
	}
}


export default withStyles(styles, {withTheme:true })(NewPost);