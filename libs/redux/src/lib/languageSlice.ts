import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { environment } from '../../../../apps/clients/src/environments/environment';

interface LanguageState {
  value: string;
}

const initialState: LanguageState = {
  value: null,
}
export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    loadLanguage: (state) => {
      const la = localStorage.getItem('la');
      if(la){
        state.value=la;
      }else{
        localStorage.setItem('la',environment.config.la);
        state.value=environment.config.la;
      }
    },
    changeLanguage: (state, action: PayloadAction<string>)=>{
      localStorage.setItem('la',action.payload);
      state.value=action.payload;
    }
  },
})
export const { loadLanguage, changeLanguage } = languageSlice.actions
