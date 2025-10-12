const initialState = {
    theme: 'світла',
};
export const switchTheme = () => ({
    type: 'SWITCH_THEME'
})

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return action.payload;
        case 'SWITCH_THEME':
            return {
                ...state, theme: state.theme === 'світла' ? 'темна' : 'світла'
            };
        default:
            return state;
    }
}

export default themeReducer; 
