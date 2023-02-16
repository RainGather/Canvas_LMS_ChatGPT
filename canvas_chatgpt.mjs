import { ChatGPTAPI } from 'chatgpt';
import dotenv from 'dotenv';
import axios from 'axios';
import schedule from 'node-schedule';

dotenv.config()

const chatgpt = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
})

// 设置 Canvas LMS API 的基本信息
const CANVASLMS_TOKEN = process.env.CANVASLMS_TOKEN;
const CANVASLMS_API_URL = `http://${process.env.CANVASLMS_HOST}/api/v1/`;

// 获取发给特定用户的私信列表
const PULL_MSG_URL = `${CANVASLMS_API_URL}conversations`;
const HEADERS = { Authorization: `Bearer ${CANVASLMS_TOKEN}` };
let chatlist = {};
let chatids = {};

async function pull_msg() {
  await axios.get(PULL_MSG_URL, { headers: HEADERS })
    .then((response) => {
      const messages = response.data;
      messages.forEach((message) => {
        if (message.workflow_state == 'unread') {
          chatlist[message.participants[0].id] = {
            last_message: message.last_message,
            last_message_at: message.last_message_at,
            last_message_id: message.id,
          }

        }
      })
      const mark_all_as_read_url = `${CANVASLMS_API_URL}conversations/mark_all_as_read`;
      axios.post(mark_all_as_read_url, {}, { headers: HEADERS })
        .then()
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log('获取私信列表失败：');
      console.log(error);
    });
}

async function get_reply(msg, userid) {
  var args = {
    promptPrefix: process.env.PROMPT_PREFIX
  }
  if (userid in chatids) {
    args.conversationId = chatids[userid].conversationId;
    args.parentMessageId = chatids[userid].parentMessageId;
  }
  let res;
  try {
    res = await chatgpt.sendMessage(msg, args);
  } catch (error) {
    console.log(error);
    return '服务器已离线，请暂停使用。';
  }
  if (!(userid in chatids)) {
    chatids[userid] = {
      conversationId: res.conversationId,
      parentMessageId: res.id
    }
  }
  return res.text;
}

async function reply_fn() {
  if (Object.keys(chatlist).length > 0) {
    const keys = Object.keys(chatlist).sort(function (a, b) {
      return a.time < b.time ? -1 : 1;
    })
    const userid = keys[0]
    const message = chatlist[userid]
    delete chatlist[userid];
    const reply = await get_reply(message.last_message, userid);
    const replyUrl = `${CANVASLMS_API_URL}conversations/${message.last_message_id}/add_message`;
    const payload = { body: reply };
    axios.post(replyUrl, payload, { headers: HEADERS })
      .then(() => { })
      .catch((error) => {
        if (!(userid in chatlist)) {
          chatlist[userid] = message;
        }
        console.log('回复失败：');
        console.log(error.response.status);
      });
  }
}

const job = schedule.scheduleJob('*/5 * * * * *', function () {
  try {
    pull_msg().then(reply_fn);
  } catch (error) {
    console.log(error);
  }
})
