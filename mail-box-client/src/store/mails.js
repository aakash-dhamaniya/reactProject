import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseAddress } from "../utils/autKey/api";
export const getSentMail = createAsyncThunk(
  "getSentMails",
  async (data, { rejectWithValue }) => {
    console.log("get email call hua");
    let email = localStorage.getItem("email");
    email = email.replace(/[@.]/g, "");
    const response = await axios.get(
      `${baseAddress}/SentmailsData/${email}/emails.json`
    );
    try {
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getInbox = createAsyncThunk(
  "getInbox",
  async (data, { rejectWithValue }) => {
    console.log("getInbox run hua");
    let email = localStorage.getItem("email");
    email = email.replace(/[@.]/g, "");
    console.log(email);
    const response = await axios.get(
      `${baseAddress}/mailsData/${email}/emails.json`
    );
    try {
      // console.log("in async thunk", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const mailSlice = createSlice({
  name: "mails",
  initialState: {
    inbox: [],
    sent: [],
    loading: false,
    compose: false,
    userinbox: true,
    sentmail: false,
  },
  reducers: {
    mailSent(state, action) {
      state.sent.push(action.payload);
    },
    setRealTimeData(state, action) {
      const transformedData = [];
      const data = action.payload;
      console.log(action.payload);
      for (let item in data) {
        transformedData.push({
          id: item,
          message: data[item].message,
          senderEmail: data[item].senderEmail,
          subject: data[item].subject,
          read: data[item].read,
          time: data[item].time,
        });
      }
      state.inbox = transformedData;
    },
    userinboxState(state) {
      state.userinbox = true;
      state.compose = false;
      state.sentmail = false;
      // localStorage.setItem("inbox", true);
      // localStorage.setItem("sentInbox", false);
      // localStorage.setItem("compose", false);
    },
    usersentState(state) {
      state.userinbox = false;
      state.compose = false;
      state.sentmail = true;
      // localStorage.setItem("inbox", false);
      // localStorage.setItem("sentInbox", true);
      // localStorage.setItem("compose", false);
    },
    usercomposeState(state) {
      state.userinbox = false;
      state.compose = true;
      state.sentmail = false;
      // localStorage.setItem("inbox", false);
      // localStorage.setItem("sentInbox", false);
      // localStorage.setItem("compose", true);
    },
  },
  extraReducers: {
    //storing data to sentbox
    [getSentMail.pending]: (state) => {
      state.loading = true;
    },
    [getSentMail.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload === null) {
        state.sent = [];
        return;
      }
      const transformedData = [];
      const data = action.payload;
      console.log(action.payload);
      for (let item in data) {
        transformedData.push({
          id: item,
          message: data[item].message,
          to: data[item].to,
          subject: data[item].subject,
          time: data[item].time,
        });
      }
      //sorting emails according to time
      transformedData.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      });
      state.sent = transformedData;
    },
    [getSentMail.rejected]: (state) => {
      state.loading = false;
    },
    //storing data to inbox
    [getInbox.pending]: (state) => {
      state.loading = true;
    },
    [getInbox.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("inbox", action.payload);
      if (action.payload === null) {
        state.inbox = [];
        return;
      }
      const transformedData = [];
      const data = action.payload;
      console.log(action.payload);
      for (let item in data) {
        transformedData.push({
          id: item,
          message: data[item].message,
          senderEmail: data[item].senderEmail,
          subject: data[item].subject,
          read: data[item].read,
          time: data[item].time,
        });
      }
      //sorting emails according to time
      transformedData.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      });
      // const transformedData = Object.values(action.payload).map((item) => {
      //   return {
      //     message: item.message,
      //     senderEmail: item.senderEmail,
      //     subject: item.subject,
      //   };
      // });
      state.inbox = transformedData;
    },
    [getInbox.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default mailSlice.reducer;
export const mailsAction = mailSlice.actions;
