import userReducer, {
  clearError,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logout
} from '../slices/userSlice';

describe('userSlice', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null
  };

  test('initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('clearError', () => {
    const state = {
      ...initialState,
      error: 'Some error'
    };
    const action = clearError();
    expect(userReducer(state, action)).toEqual(initialState);
  });

  describe('registerUser', () => {
    test('should handle pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('fulfilled', () => {
      const user = { name: 'admin', email: 'admin@mail.com' };
      const action = { type: registerUser.fulfilled.type, payload: user };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        user
      });
    });

    test('rejected', () => {
      const errorMessage = 'Registration failed';
      const action = {
        type: registerUser.rejected.type,
        payload: errorMessage
      };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('loginUser', () => {
    test('should handle pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('fulfilled', () => {
      const user = { name: 'Odmin Odmin', email: 'odmin@mail.com' };
      const action = { type: loginUser.fulfilled.type, payload: user };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        user
      });
    });

    test('rejected', () => {
      const errorMessage = 'Login failed';
      const action = {
        type: loginUser.rejected.type,
        payload: errorMessage
      };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('getUser', () => {
    test('pending', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('fulfilled', () => {
      const user = { name: 'Admen', email: 'admen@mail.com' };
      const action = { type: getUser.fulfilled.type, payload: user };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        user
      });
    });

    test('rejected', () => {
      const errorMessage = 'Failed to fetch user';
      const action = {
        type: getUser.rejected.type,
        payload: errorMessage
      };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('logout', () => {
    test('fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: { name: 'User', email: 'user@mail.com' }
      };
      const action = { type: logout.fulfilled.type };
      const state = userReducer(stateWithUser, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('updateUser', () => {
    test('pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('fulfilled', () => {
      const updatedUser = {
        name: 'Updated User',
        email: 'updated@mail.com'
      };
      const action = { type: updateUser.fulfilled.type, payload: updatedUser };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        user: updatedUser
      });
    });

    test('rejected', () => {
      const errorMessage = 'Update failed';
      const action = {
        type: updateUser.rejected.type,
        payload: errorMessage
      };
      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });
});
