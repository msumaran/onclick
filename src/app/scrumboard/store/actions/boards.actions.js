import history from '@history';
import BoardModel from '../../model/BoardModel';
import firebaseService from 'app/services/firebaseService';
import _ from '@lodash';
export const GET_BOARDS = '[SCRUMBOARD APP] GET BOARDS';
export const RESET_BOARDS = '[SCRUMBOARD APP] RESET BOARDS';
export const NEW_BOARD = '[SCRUMBOARD APP] NEW BOARD';

export function getBoards() {

    let ref = firebaseService.db.ref(`board`);
    return dispatch =>
        ref.once('value')
        .then(snapshot => {
            let boards = snapshot.val();
            if (boards !== null) {
                _.forEach(boards, function(value, key) {
                    if (value) value.id = key;
                });
            } else {
                boards = [];
            }
            return dispatch({
                type: GET_BOARDS,
                payload: _.toArray(boards)
            })

        });
}

export function resetBoards() {
    return {
        type: RESET_BOARDS
    };
}

export function newBoard(board) {
    board = new BoardModel();

    return dispatch =>
        firebaseService.db.ref(`board`)
        .push(board)
        .then(snapshot => {

            history.push({
                pathname: `/scrumboard/boards/${snapshot.key}/${board.handle}`
            });
            return dispatch({
                type: NEW_BOARD,
                board: board
            });
        });
}