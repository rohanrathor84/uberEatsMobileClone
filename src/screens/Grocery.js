import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {tConvert, TimeConverter} from '../utilities/utils';

const startDate = '2021-11-01 13:00:00';
const endDate = '2021-11-01 20:18:00';

export default function Grocery() {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;

  const startTimer = () => {
    const countDownDate = new Date(endDate).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        // Stop Timer
        clearInterval(interval.current);
      } else {
        // Update Timer
        setTimerDays(days < 10 ? `0${days}` : days);
        setTimerHours(hours < 10 ? `0${hours}` : hours);
        setTimerMinutes(minutes < 10 ? `0${minutes}` : minutes);
        setTimerSeconds(seconds < 10 ? `0${seconds}` : seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
    // console.log(
    //   'Current date/time1: ' +
    //     new Date().getTime() +
    //     '  ' +
    //     new Date(endDate).getTime(),
    // );
    // console.log(new Date(endDate).getTime() - new Date().getTime());
    console.log(new Date().toDateString());
    console.log(new Date().toLocaleTimeString());
    console.log('tconvert: ' + TimeConverter(new Date().toLocaleTimeString()));
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to Groceries</Text>
      <Text>{timerDays}</Text>
      <Text>{timerHours}</Text>
      <Text>{timerMinutes}</Text>
      <Text>{timerSeconds}</Text>
    </View>
  );
}
