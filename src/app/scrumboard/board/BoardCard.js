import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const useStyles = makeStyles(theme => ({
	card: {
		color: '#fff',
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function BoardCard(props) {
	const dispatch = useDispatch();
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
	
	const classes = useStyles(props);
	const { card, index, list } = props;

	card.checklists = _.keyBy(card.checklists, 'id');
	card.checklists= _.values(card.checklists);
	if(!_.has(card, "idLabels")) card.idLabels = [];
	if(!_.has(card, "checklists")) card.checklists = [];
	if(!_.has(card, "checkItems")) card.checkItems = [];
	if(!_.has(card, "idMembers")) card.idMembers = [];
	if(!_.has(card, "attachments")) card.attachments = [];
	if(!_.has(card, "comments")) card.comments = [];
	if(!_.has(card, "activities")) card.activities = [];
	card.checklists.map((list) => {

		if(list.checkItems === undefined ) list.checkItems = [];
		return null
	});

	const checkItemsChecked = getCheckItemsChecked(card);
	const checkItems = getCheckItems(card);
	const commentsCount = getCommentsCount(card);

	

	function handleCardClick(ev, _card,  _list) {
		ev.preventDefault();
		let data = {card: _card, list: _list}
		dispatch(Actions.openCardDialog(data));
	}

	function getCheckItemsChecked(_card) {
		if(!_.has(_card, "checklists")) return 0;
		else return _.sum(_card.checklists.map(list => _.sum(list.checkItems.map(x => (x.checked ? 1 : 0)))));
	}

	function getCheckItems(_card) {
 		if(!_.has(_card, "checklists")) return 0;
		else return _.sum(_card.checklists.map(x => x.checkItems.length));
	}

	function getCommentsCount(_card) {
		return _.sum(_card.activities.map(x => (x.type === 'comment' ? 1 : 0)));
		//return;
	}
	console.log('card: ',card);

	return (
		<Draggable draggableId={card.id} index={index} type="card">
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<Card
						className={clsx(classes.card, 'w-full mb-16 rounded-4 cursor-pointer border-1')}
						elevation={snapshot.isDragging ? 3 : 0}
						onClick={ev => handleCardClick(ev, card, list)}
					>
						{board.settings.cardCoverImages && card.idAttachmentCover !== '' && (
							<img
								className="block"
								src={_.find(card.attachments, { id: card.idAttachmentCover }).src}
								alt="card cover"
							/>
						)}

						<div className="p-16 pb-0">
							{card.idLabels.length > 0 && (
								<div className="flex flex-wrap mb-8 -mx-4">
									{card.idLabels.map(id => {
										console.log(id);
										const label = _.find(board.labels, { id });
										return (
											<Tooltip title={label.name} key={id}>
												<div className={clsx(label.class, 'w-32  h-6 rounded-6 mx-4 mb-6')} />
											</Tooltip>
										);
									})}
								</div>
							)}

							<Typography className="font-600 mb-12">{card.name}</Typography>

							{(card.due || checkItems > 0) && (
								<div className="flex items-center mb-12 -mx-4">
									{card.due && (
										<div
											className={clsx(
												'flex items-center px-8 py-4 mx-4 rounded-sm',
												moment() > moment(card.due)
													? 'bg-red text-white'
													: 'bg-green text-white'
											)}
										>
											<Icon className="text-16">access_time</Icon>
											<span className="mx-4">{moment(card.due).format('MMM Do YY')}</span>
										</div>
									)}

									{checkItems > 0 && (
										<div
											className={clsx(
												'flex items-center px-8 py-4 mx-4 rounded-sm',
												checkItemsChecked === checkItems
													? 'bg-green text-white'
													: 'bg-grey-700 text-white'
											)}
										>
											<Icon className="text-16">check_circle</Icon>
											<span className="mx-4">{`${checkItemsChecked}/${checkItems}`}</span>
										</div>
									)}
								</div>
							)}

							{card.idMembers.length > 0 && (
								<div className="flex flex-wrap mb-12 -mx-4">
									{card.idMembers.map(id => {
										const member = _.find(board.members, { id });
										return (
											<Tooltip title={member.name} key={id}>
												<Avatar className="mx-4 w-32 h-32" src={member.avatar} />
											</Tooltip>
										);
									})}
									<div />
								</div>
							)}
						</div>

						<div className="flex justify-between h-48 px-16 border-t-1">
							<div className="flex items-center -mx-6">
								{card.subscribed && (
									<Icon className="text-18 mx-6" color="action">
										remove_red_eye
									</Icon>
								)}

								{card.description !== '' && (
									<Icon className="text-18 mx-6" color="action">
										description
									</Icon>
								)}
							</div>

							<div className="flex items-center justify-end -mx-6">
								{card.attachments && (
									<span className="flex items-center mx-6">
										<Icon className="text-18" color="action">
											attachment
										</Icon>
										<Typography className="mx-8" color="secondary">
											{card.attachments.length}
										</Typography>
									</span>
								)}
								{commentsCount > 0 && (
									<span className="flex items-center mx-6">
										<Icon className="text-18" color="action">
											comment
										</Icon>
										<Typography className="mx-8" color="secondary">
											{commentsCount}
										</Typography>
									</span>
								)}
							</div>
						</div>
					</Card>
				</div>
			)}
		</Draggable>
	);
}

export default BoardCard;
