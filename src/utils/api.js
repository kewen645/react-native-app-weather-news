// 获取新闻列表
export const getNewsList = async type => {
  const key = '3c386ae14933c19a862374957c92fe6a';
  const url = `http://v.juhe.cn/toutiao/index?type=${type}&key=${key}`;

  try {
    const res = await (await fetch(url)).json();
    if (res.error_code === 0) return res.result.data;
    return [];
  } catch (err) {
    console.err('Fetch Error');
  }
};

// 获取城市信息
export const getCityInfo = async coords => {
  const key = '1de3875f6c724b94a9295f74564b7608';
  const url = `https://geoapi.qweather.com/v2/city/lookup?location=${coords.longitude},${coords.latitude}&key=${key}`;
  try {
    const res = await (await fetch(url)).json();
    if (res.code === '200') return res.location[0];
    return {};
  } catch (err) {
    console.error('Fetch error');
  }
};

// 获取三天天气预报
export const get3DayForecast = async coords => {
  const key = '1de3875f6c724b94a9295f74564b7608';
  const url = `https://devapi.qweather.com/v7/weather/3d?location=${coords.longitude},${coords.latitude}&key=${key}`;

  try {
    const res = await (await fetch(url)).json();
    if (res.code === '200') return res.daily;
    return [];
  } catch (err) {
    console.error('Fetch error');
  }
};

// 获取生活指数，默认type=0，获取所有的生活指数
export const getWeatherIndices = async (coords, type = 0) => {
  const key = '1de3875f6c724b94a9295f74564b7608';
  const url = `https://devapi.qweather.com/v7/indices/1d?location=${coords.longitude},${coords.latitude}&key=${key}&type=${type}`;

  try {
    const res = await (await fetch(url)).json();
    if (res.code === '200') return res.daily;
    return [];
  } catch (err) {
    console.error('Fetch error');
  }
};
