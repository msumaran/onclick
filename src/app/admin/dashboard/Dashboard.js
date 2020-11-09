// import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
// import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
	page: {

	}
}));
function DashboardPage(props) {
	const classes = useStyles(props);
	
	// const { t } = useTranslation('DashboardPage');

	return (
		<div className={classes.page}>
		<FusePageSimple
			content={
				<div className="p-24 rounded-top bgdark">
					<h4>
                        Admin Dashboard
                    </h4>
					<br />
					{/* <DemoContent /> */}
				</div>
			}
		/>
		</div>
	);
}

export default DashboardPage;
