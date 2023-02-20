import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {
      userinfo: {
        username: '',
        password: ''
      },
      isLogin: false
    }
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.value = {
        userInfo: action.payload,
        isLogin: true
      };
    },
    loginFailure: state => {
      state.value = {
        userinfo: {
          username: '',
          password: ''
        },
        isLogin: false
      };
    }
  }
});

export const {loginSuccess, loginFailure} = authSlice.actions;
export const logout = () => dispatch => {
  dispatch(loginFailure());
};

export default authSlice.reducer;
