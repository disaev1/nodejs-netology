const http = require('http');
const readline = require('readline');

const API_URL = 'http://api.weatherstack.com/current';
const weatherUnit = '℃';
const speedUnit = 'km/h';
const pressureUnit = 'millibar';

const input = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log('Hello! This application displays current weather for cities.');

function go() {
  input.question('Enter a city name: ', answer => {
    if (!answer) {
      go();
      return;
    }

    const requestUrl = `${API_URL}?access_key=${process.env.ACCESS_KEY}&query=${answer}`;
  
    http.get(requestUrl, (res) => {
      let resultStr = '';
      let result;
  
      res
        .on('data', chunk => {
          resultStr += chunk;
        })
        .on('end', () => {
          result = JSON.parse(resultStr);
          displayResults(result);
          go();
        });
    });
  });
}

function displayResults(data) {
  const { name, country, lon, lat, timezone_id, localtime, utc_offset } = data.location;
  const {
    observation_time,
    temperature,
    weather_descriptions,
    wind_speed,
    wind_dir,
    pressure,
    humidity
  } = data.current;

  console.log('***');
  console.log(`${name}, ${country}, [${lon}, ${lat}], current local time ${localtime.slice(11)} (${timezone_id} ${formatUTCOffset(utc_offset)})`);
  console.log(`By ${observation_time} (UTC): ${formatTemperature(temperature)} ${weather_descriptions.join(', ')}, pressure ${pressure} ${pressureUnit}, humidity ${humidity}%, wind ${wind_dir} ${wind_speed}${speedUnit}`);
  console.log('***');
}

function formatUTCOffset(raw) {
  const value = Number(raw);

  if (value >= 0) {
    return `+${value}`;
  } else {
    return value;
  }
}

function formatTemperature(value) {
  const valueStr = value > 0 ? `+${value}` : value;

  return `${valueStr}${weatherUnit}`;
}

go();
