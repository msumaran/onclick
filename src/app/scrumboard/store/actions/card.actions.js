import firebaseService from 'app/services/firebaseService';
import { getBoard } from './board.actions';
export const OPEN_CARD_DIALOG = '[SCRUMBOARD APP] OPEN CARD DIALOG';
export const CLOSE_CARD_DIALOG = '[SCRUMBOARD APP] CLOSE CARD DIALOG';
export const UPDATE_CARD = '[SCRUMBOARD APP] UPDATE CARD';
export const REMOVE_CARD = '[SCRUMBOARD APP] REMOVE CARD';

export function openCardDialog(data) {
    return {
        type: OPEN_CARD_DIALOG,
        payload: data
    };
}

export function closeCardDialog() {
    return {
        type: CLOSE_CARD_DIALOG
    };
}

export function updateCard(boardId, card, list) {
    console.log('updateCard');
    return (dispatch, getState) => {
        firebaseService.db.ref(`board/${boardId}/lists/${list.id}/cards/${card.id}`).update(card).then(() => {
            return dispatch(getBoard({ boardId: boardId }));
        });
    };
}
export function removeCard(boardId, listId, cardId) {
    return (dispatch, getState) => {
        firebaseService.db.ref(`board/${boardId}/lists/${listId}/cards/${cardId}`).remove().then(() => {
            Promise.all([
                dispatch({
                    type: REMOVE_CARD,
                    boardId,
                    cardId
                })
            ]).then(() => dispatch(getBoard({ boardId: boardId })));
        });

    };
}