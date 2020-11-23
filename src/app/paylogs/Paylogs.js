import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import DemoContent from '@fuse/core/DemoContent';
// import { useTranslation } from 'react-i18next';

// import PaylogsDialog from './PaylogsDialog';
import PaylogsHeader from './PaylogsHeader';
import PaylogsList from './PaylogsList';
// import PaylogsSidebarContent from './PaylogsSidebarContent';

import * as Actions from './store/actions';
import reducer from './store/reducers';


const useStyles = makeStyles({
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	}
});

function PaylogsPage(props) {
    const dispatch = useDispatch();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const userUID = useSelector(({ auth }) => auth.user.uid);

    useEffect(() => {
		dispatch(Actions.getPaylogs(props.match.params, userUID));
		dispatch(Actions.getUserData());
    }, [dispatch, props.match.params, userUID]);
    
	return (
		<div>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full bgdark',
					content: 'flex flex-col h-full bgdark',
					leftSidebar: 'w-256 border-0 bgdark',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 bgdark rounded-left'
				}}
				header={<PaylogsHeader pageLayout={pageLayout} />}
				content={<PaylogsList />}
				// leftSidebarContent={<PaylogsSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>

			{/* <FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={ev => dispatch(Actions.openNewContactDialog())}
				>
					<Icon>person_add</Icon>
				</Fab>
			</FuseAnimate> */}

			{/* <PaylogsDialog /> */}

		</div>
	);
}

export default withReducer('paylogsApp', reducer)(PaylogsPage);
