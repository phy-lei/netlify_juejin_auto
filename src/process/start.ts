import got from 'got'
import FormData from 'form-data'
const cookie = process.env.JUEJIN_COOKIE
const aid = process.env.JUEJIN_AID
const uuid = process.env.JUEJIN_UUID
const _signature = process.env.JUEJIN_SIGNATURE
const serverSendKey = process.env.JUEJIN_SERVER_SEND_KEY
const BASEURL = 'https://api.juejin.cn/growth_api/v1/check_in'; // 掘金签到api
const FT_URL = `https://sctapi.ftqq.com/${serverSendKey}.send`; //serve酱通知

const URL = `${BASEURL}?aid=${aid}&uuid=${uuid}&_signature=${_signature}`;
const DRAW_URL = `https://api.juejin.cn/growth_api/v1/lottery/draw?aid=${aid}&uuid=${uuid}&_signature=${_signature}`; // 抽奖api
const HEADERS = {
  cookie,
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67',
};


async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}

// 签到
async function signIn() {
  console.log('%c [ signIn ]', 'font-size:13px; background:pink; color:#bf2c9f;',);
  const res = await got.post(URL, {
    hooks: {
      beforeRequest: [
        (options) => {
          Object.assign(options.headers, HEADERS);
        },
      ],
    },
  });
  console.log('res.body', res.body);
  return JSON.parse(res.body);
}

// 抽奖
async function draw() {
  const res = await got.post(DRAW_URL, {
    hooks: {
      beforeRequest: [
        (options) => {
          Object.assign(options.headers, HEADERS);
        },
      ],
    },
  });
  console.log('res.body123123', res.body);
  return JSON.parse(res.body);
}

// 推送
async function handlePush({ title, sendinfo }) {
  const form = new FormData();
  form.append('title', title);
  form.append('desp', sendinfo);
  const res = await got.post(FT_URL, { body: form });
  console.log(res.body);
}

async function autoProcess() {
  const signInData = await signIn();
  // 防止过快签到
  await sleep(2000);
  const drawData = await draw();

  const params = {
    title: '掘金自动签到通知',
    sendinfo: '',
  };

  if (signInData.data && drawData.data) {
    params.title = '掘金签到和抽奖成功';
    params.sendinfo = `**签到成功！** 
      
    新增：${signInData.data.incr_point}矿石，共计：${signInData.data.sum_point}矿石
    
    **抽奖成功！**
    
    获得：${drawData.data.lottery_name}`;
  } else if (signInData.data && !drawData.data) {
    params.title = '掘金签到成功, 抽奖失败';
    params.sendinfo = `**签到成功！** 
    
    新增：${signInData.data.incr_point}矿石，共计：${signInData.data.sum_point}矿石
    
    **抽奖失败！**
    
    原因：${drawData.err_msg}`;
  } else if (!signInData.data && drawData.data) {
    params.title = '掘金签到失败, 抽奖成功';
    params.sendinfo = `**签到失败！** 
    
    原因：${signInData.err_msg}
    
    **抽奖成功！**
      
    获得：${drawData.data.lottery_name}`;
  } else {
    params.title = '掘金签到和抽奖失败';
    params.sendinfo = `**签到失败！** 
    
    原因：${signInData.err_msg}
    
    **抽奖失败！**
    
    原因：${drawData.err_msg}`;
  }

  // const FT_URL = `https://sctapi.ftqq.com/${serverSendKey}.send?title=${params.title}&desp=${params.sendinfo}`; //serve酱通知
  // const res = await got.get(FT_URL);
  // console.log(res.body);
  handlePush(params);
}

export default autoProcess;
