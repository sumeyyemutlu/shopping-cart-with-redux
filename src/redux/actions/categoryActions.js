import * as actionTypes from './actionTypes'

export function changeCategory(category) {
    return {type:actionTypes.CHANGE_CATEGORY, payload:category}
}
//state'te CHANGE_CATEGORY görürse bunu biz state'i payload^da verilen değere göre set etmiş oluyoruz.