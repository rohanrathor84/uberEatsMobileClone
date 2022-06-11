import NetInfo from '@react-native-community/netinfo';

export const TimeConverter = time => {
    // Check correct time format and split into components
    //   time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    //     time,
    //   ];
    let timeArray = [];
    timeArray = time.split(':');
    let AMorPMFormat = time[0] < 12 ? 'AM' : 'PM';
    let hour = timeArray[0] % 12 || 12;
    let minute = timeArray[1];
    if (hour.toString().length === 1) {
      hour = `0${hour}`;
    }
    return `${hour}:${minute} ${AMorPMFormat}`;

    //   if (time.length > 1) {
    //     // If time format correct
    //     console.log('Util: ' + time);
    //     time = time.slice(1); // Remove full string match value
    //     time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    //     time[0] = +time[0] % 12 || 12; // Adjust hours
    //   }
    //   return time.join(''); // return adjusted time or original string
  },
  checkNetworkConnected = isConnected => {
    NetInfo.fetch()
      .then(state => {
        isConnected(state.isConnected);
      })
      .catch(() => {
        isConnected(false);
      });
  };
