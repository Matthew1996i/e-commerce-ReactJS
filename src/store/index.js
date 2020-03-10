import { createStore } from 'redux'

const INITIAL_STATE = {
    data: {
        coin: 150,
        custo: 0,
        itens: []
    }, 
    count: 0,
    toEdit: {}

}


function reducer(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'ADD_CART_VALUE':
            return {
               ...state, 
               count: state.data.itens.length + 1, 
               data: {...state.data, 
                        coin: state.data.coin < action.value ? state.data.coin : state.data.coin - action.value,
                        custo: parseInt(action.value) + parseInt(state.data.custo),
                        itens: [...state.data.itens, action.item]}
            }
        case 'SET_LIST':
            return {
                ...state,
                listItensDash: action.list
            }
        case 'REMOVE_ITEM':
            return {
                ...state, 
                data: {...INITIAL_STATE.data},
                count: action.count
            }
        case 'EDIT_ITEM':
            return {
                ...state,
                toEdit: action.edit
            }
        default:
            return state   
    }
}

const store = createStore(reducer)

export default store