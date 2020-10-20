import FuseUtils from '@fuse/utils';
import history from '@history';
import firebaseService from 'app/services/firebaseService';
import _ from '@lodash';
import { showMessage } from 'app/store/actions/fuse';
import CardModel from '../../model/CardModel';
import ListModel from '../../model/ListModel';
import * as BoardsActions from './boards.actions';
import reorder from './reorder';
import { unset } from 'lodash';


export const GET_BOARD = '[SCRUMBOARD APP] GET BOARD';
export const DELETE_BOARD = '[SCRUMBOARD APP] DELETE BOARD';
export const COPY_BOARD = '[SCRUMBOARD APP] COPY BOARD';
export const RENAME_BOARD = '[SCRUMBOARD APP] RENAME BOARD';
export const CHANGE_BOARD_SETTINGS = '[SCRUMBOARD APP] CHANGE BOARD SETTINGS';
export const RESET_BOARD = '[SCRUMBOARD APP] RESET BOARD';
export const ORDER_LIST = '[SCRUMBOARD APP] ORDER LIST';
export const ORDER_CARD = '[SCRUMBOARD APP] ORDER CARD';
export const ADD_CARD = '[SCRUMBOARD APP] ADD CARD';
export const ADD_LIST = '[SCRUMBOARD APP] ADD LIST';
export const ADD_LABEL = '[SCRUMBOARD APP] ADD LABEL';
export const RENAME_LIST = '[SCRUMBOARD APP] RENAME LIST';
export const REMOVE_LIST = '[SCRUMBOARD APP] REMOVE LIST';

export function getBoard(params) {

    let ref = firebaseService.db.ref('board/' + params.boardId);
    return dispatch =>
        ref
            .once('value')
            .then(snapshot => {

                let board = snapshot.val();
                if (board == null) return;
                board.id = params.boardId;
                return dispatch({
                    type: GET_BOARD,
                    payload: board
                })

            });

}

export function resetBoard() {
    return {
        type: RESET_BOARD
    };
}

export function reorderList(result) {
    return (dispatch, getState) => {
        const { board } = getState().scrumboardApp;
        const { lists } = board;
        console.log('reorder list');

        let ordered = reorder(lists, result.source.index, result.destination.index);

        firebaseService.db.ref(`board/${board.id}/lists`).remove().then(() => {
            let promises = [];
            ordered.forEach(element => {
                unset(element.id);
                promises.push( firebaseService.db.ref(`board/${board.id}/lists`).push(element) );
            });

            return Promise.all(promises).then(result => {
                dispatch(
                    showMessage({
                        message: 'List Order Saved',
                        autoHideDuration: 2000,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    })
                );
            });
        });
        dispatch(getBoard({ boardId: board.id }));
        return dispatch({
			type: ORDER_LIST,
			payload: ordered
		});
    };
}

export function reorderCard(result) {
    return (dispatch, getState) => {
        const { board } = getState().scrumboardApp;
        console.log('reorder card');
        //const ordered = reorderQuoteMap(lists, result.source, result.destination);
        board.lists.map(list => {
            list.cards = _.keyBy(list.cards, 'id');
            list.cards = _.toArray(list.cards);
            return null
        });
        board.lists = _.toArray(board.lists);
        board.lists = _.keyBy(board.lists, 'id');

        
        firebaseService.db.ref(`board/${board.id}`).update(board).then(() => {
            return dispatch(getBoard({ boardId: board.id }));
        });

    }
}
export function newCard(boardId, listId, cardTitle) {
    const data = new CardModel({ name: cardTitle });

  
    return dispatch =>
        firebaseService.db.ref(`board/${boardId}/lists/${listId}/cards`).push(data).then((snapshot) => {
            dispatch(getBoard({ boardId: boardId }));
        });
}

export function newList(boardId, listTitle) {
    const data = new ListModel({ name: listTitle });
    return dispatch =>
        firebaseService.db.ref('board/' + boardId + '/lists').push(data).then((snapshot) => {
            dispatch(getBoard({ boardId: boardId }));
        });

}

export function renameList(boardId, listId, listTitle) {

    return (dispatch, getState) => {
        firebaseService.db.ref(`board/${boardId}/lists/${listId}`).update({ name: listTitle }).then(() => {
            Promise.all([
                dispatch({
                    type: RENAME_LIST,
                    listId,
                    listTitle
                })
            ]).then(() => dispatch(getBoard({ boardId: boardId })));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    };
}

export function removeList(boardId, listId) {

    return dispatch =>
        firebaseService.db.ref(`board/${boardId}/lists/${listId}`).remove().then(() => {
            Promise.all([
                dispatch({
                    type: REMOVE_LIST
                })
            ]).then(() => dispatch(getBoard({ boardId: boardId })));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
}

export function addLabel(label) {
    return dispatch => {
        return dispatch({
            type: ADD_LABEL,
            payload: label
        });
    };
}

export function changeBoardSettings(newSettings) {
    return (dispatch, getState) => {
        const { board } = getState().scrumboardApp;
        const settings = _.merge(board.settings, newSettings);
        firebaseService.db.ref(`board/${board.id}/settings`).update(settings).then((response) => {
            Promise.all([
                dispatch({
                    type: CHANGE_BOARD_SETTINGS,
                    payload: settings
                })
            ]).then(() => dispatch(getBoard({ boardId: board.id })));
        })
    };
}

export function deleteBoard(boardId) {
    return (dispatch, getState) => {
        firebaseService.db.ref(`board/${boardId}`).remove().then(() => {
            history.push({
                pathname: '/scrumboard/boards'
            });
            return dispatch({
                type: DELETE_BOARD
            });
        });
    };
}

export function copyBoard(board) {
    const newBoard = _.merge(board, {
        id: FuseUtils.generateGUID(),
        name: `${board.name} (Copied)`,
        uri: `${board.uri}-copied`
    });
    return dispatch => {
        dispatch(BoardsActions.newBoard(newBoard));
        return { type: COPY_BOARD };
    };
}

export function renameBoard(boardId, boardTitle) {
    return (dispatch, getState) => {
        firebaseService.db.ref(`board/${boardId}`).update({ name: boardTitle }).then(() => {
            Promise.all([
                dispatch({
                    type: RENAME_BOARD,
                    boardTitle
                })
            ]).then(() => dispatch(getBoard({ boardId: boardId })));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    };


}