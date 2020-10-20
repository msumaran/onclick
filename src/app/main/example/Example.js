// import DemoContent from '@fuse/core/DemoContent';
// import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
// import { useTranslation } from 'react-i18next';
import EmailEditor from 'react-email-editor';
import sample from './sample.json';


const useStyles = makeStyles(theme => ({
	page: {
		height: '100px'

	}
}));


function ExamplePage(props) {
	const emailEditorRef = useRef(null);
	const classes = useStyles(props);

	// const saveDesign = () => {
	// 	emailEditorRef.current.editor.saveDesign((design) => {
	// 		console.log('saveDesign', design);
	// 		//alert('Design JSON has been logged in your developer console.');
	// 	});
	// };


	const onDesignLoad = (data) => {
		console.log('onDesignLoad', data);
	};
	const onLoad = () => {
		if (emailEditorRef.current !== null) {
			console.log(emailEditorRef.current.editor);
			emailEditorRef.current.editor.addEventListener('onDesignLoad', onDesignLoad);
			emailEditorRef.current.editor.loadDesign(sample);
		}else{
			setTimeout (() => emailEditorRef.current.editor.loadDesign(sample), 3000);
		}

	};

	const appearance = {
		theme: 'dark'
	  };
	const options = {
		locale: 'es'


	};
	return (

		<div className={classes.page}>

			<EmailEditor
				ref={emailEditorRef}
				minHeight='900px'
				onLoad={onLoad}
				appearance={appearance}
				options={options}
			/>
		</div>
	);
}

export default ExamplePage;
