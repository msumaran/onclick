import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
// import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
	page: {

	}
}));
function HomePage(props) {
	const classes = useStyles(props);
	
	// const { t } = useTranslation('HomePage');

	return (
		<div className={classes.page}>
		<FusePageSimple
			rightSidebarContent={
				<div className="p-24">
					<h4>Titulo</h4>
				</div>
			}
			// contentToolbar={
			// 	<div className="px-24">
			// 		<h4>Content Toolbar</h4>
			// 	</div>
			// }
			content={
				<div className="p-24 rounded-top bgdark">
					<h4>Content</h4>
					<br />
					<DemoContent />
				</div>
			}
		/>
		</div>
	);
}

export default HomePage;
