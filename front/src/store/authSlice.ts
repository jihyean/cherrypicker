import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
	UserModel, 
	RequestLogin, RequestRegister,
	LoginFormModel, RegisterFormModel,
} from '@/lib/api/auth';

interface AuthState {
  user: UserModel | null;
  access_token: string | null;
  refresh_token: string | null;
  registrationSuccess: boolean;

  loading: boolean;
  error: string | null;

}

const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  registrationSuccess: false,

  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ user_id, password }: LoginFormModel) => {
    const response = await RequestLogin({ user_id, password });
		console.log(response)
		if (response.state !== 200) {
			throw new Error(response.message);
		}
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ user_id, password, user_name, user_email, user_gender }: RegisterFormModel) => {
    const response = await RequestRegister({ user_id, password, user_name, user_email, user_gender });
		if (response.state !== 201) {
			throw new Error(response.message);
		}
    return response;
  }
);

// export const update = createAsyncThunk(
// 	'auth/update',
// 	async ({ username, email, bio, password }: UpdateFormModel) => {
// 		const response = await RequestUpdate({ email, username, bio, password });
// 		console.log(response)
// 		if (response.status !== 'success') {
// 			throw new Error(response.message);
// 		}
// 		return response;
// 	}
// );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.data || !action.payload.data.user || !action.payload.data.access_token || !action.payload.data.refresh_token) {
          state.error = 'Login failed';
          return;
        }
        state.user = action.payload.data.user;
        state.access_token = action.payload.data.access_token;
        state.refresh_token = action.payload.data.refresh_token;
        localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        localStorage.setItem('access_token', action.payload.data.access_token);
        localStorage.setItem('refresh_token', action.payload.data.refresh_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
			// .addCase(update.pending, (state) => {
			// 	state.loading = true;
			// 	state.error = null;
			// })
			// .addCase(update.fulfilled, (state, action) => {
			// 	state.loading = false;
			// 	state.user = null;
			// 	state.token = null;
			// 	localStorage.removeItem('user');
			// 	localStorage.removeItem('token');
			// })
			// .addCase(update.rejected, (state, action) => {
			// 	state.loading = false;
			// 	state.error = action.error.message || 'Update failed';
			// });
  },
});

export const { logout, resetRegistrationSuccess } = authSlice.actions;

export default authSlice.reducer;
