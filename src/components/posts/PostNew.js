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
import PhotoIcon from 'material-ui-icons/Photo';
import ChipInput from 'material-ui-chip-input';


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
	  	activeStep: 0,
	  	chips: [],
	  	chipDisabled: false
	  };
	  this.errors={};
	  this.handleTextPost = this.handleText.bind(this);
	  // this.onDropFile = this.onDropFile.bind(this);
	  this.handleClose = this.handleClose.bind(this);
	  this.handleOpen = this.handleOpen.bind(this);
	  this.handleBack = this.handleBack.bind(this);
	  this.handleNext = this.handleNext.bind(this);
	  this.handleReset = this.handleReset.bind(this);
	}

	handleNext() {
		if(this.state.activeStep < 2 )
		    this.setState({
		      activeStep: this.state.activeStep + 1,
			});
		else {
			if(this.state.text){
				this.props.onAddNewPost({
			        author: "Holder",
			        subheader: Date.now(),
			        title: this.state.text ,
			        imgUrl: this.state.filesPreview,
		 			file: this.state.files
				});

				this.setState({	  	
					text: '', 
				  	filesPreview: '',
				  	open:false,
				  	activeStep: 0,
				  	chips: [],
				  	chipDisabled: false
		  		});
			}
			else {
				this.errors.title = "Please enter a title"
				this.setState({	  	
					
				  	activeStep: 1,

		  		});
			}
		}
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

	handleChange(chips) {
		if(chips.length < 5) {
			console.log("added", chips);
			this.setState ({
				chips: chips
			})
		}
		else {
			console.log("you have more than 5");
			// this.setState ({
			// 	chipDisabled: true
			// })
		}
	}

	checkChips(chip) {
		return this.state.chips.length < 5;
	}	

	onDrop = (files) => {
		// this.state.files.push(file);
		console.log(files[0]);
		this.setState ({
			filesPreview : files[0].preview,
			files:files[0]
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
          transition={Slide}

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
 	  		   {activeStep === 1?	
				
				<TextField 
			    	fullWidth
			    	required
			    	label="What blazing today"
			    	error={this.errors.title?true:false}
          			helperText={this.errors.title}
		    		value={this.state.text} 
		    		onChange={this.handleTextPost}
		    		className={classes.textField}
			    /> 	: ''}
			    

			    {activeStep ===0 ?
		    	 <Dropzone
		            accept="image/jpeg, image/png, image/gif"
		            onDrop={this.onDrop}
		            name="upload"
		            className={classes.dropZone}>
	          	 {this.state.filesPreview ? <img src={this.state.filesPreview} height="50%" width="100%"/> :
	          	 	<div>
	          	 		<PhotoIcon style={{width:100,height:100,margin:'0 auto'}}/>
						<p>Drag and Drop files here or click to select files to upload.</p>
						<p>Only *.jpeg and *.png and *.gif images will be accepted</p> 
					</div>} 
				 </Dropzone>: '' }

				 {activeStep === 2? 
				 <ChipInput
					  defaultValue={this.state.chips}
					  fullWidth
					  newChipKeyCodes={[13,188,32]}
					  // onRequestAdd={(chip) => this.handleRequestAdd(chip)}
  					  // onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
  					  // onBeforeRequestAdd={(chip) => this.checkChips(chip)}
					  onChange={(chips) => this.handleChange(chips)}
					  label="Add categories seperated by space or comma"
					  disabled={this.state.chipDisabled}
					/>: '' }
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