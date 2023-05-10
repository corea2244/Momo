import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { PretendardedText } from './CustomComponent/PretendardedText';
import Timer from '../assets/images/timer.svg';

const RoutineAddButton = () => {
  const userState = useSelector(state => state.user);
  const [wakeUpHour, setWakeUpHour] = useState();
  const [wakeUpMin, setWakeUpMin] = useState();
  const [completeHour, setCompleteHour] = useState();
  const [completeMin, setCompleteMin] = useState();

  useEffect(() => {
    const wakeUpTime = (userState.wakeUpTime * 1000) + (9 * 60 * 60 * 1000);
    const wakeUp = new Date(wakeUpTime);
    if (wakeUp.getHours() < 10) {
      setWakeUpHour('0'.concat(wakeUp.getHours()));
    } else {
      setWakeUpHour(wakeUp.getHours());
    }
    if (wakeUp.getMinutes() < 10) {
      setWakeUpMin('0'.concat(wakeUp.getMinutes()));
    } else {
      setWakeUpMin(wakeUp.getMinutes());
    }
    const completeTime = (userState.completeTime * 1000) + (9 * 60 * 60 * 1000);
    const complete = new Date(completeTime);
    if (complete.getHours() < 10) {
      setCompleteHour('0'.concat(complete.getHours()));
    } else {
      setCompleteHour(complete.getHours());
    }
    if (complete.getMinutes() < 10) {
      setCompleteMin('0'.concat(complete.getMinutes()));
    } else {
      setCompleteMin(complete.getMinutes());
    }
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.totalbox}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <PretendardedText
                style={{ marginLeft: 20, marginTop: 25, fontSize: 16, fontWeight: '500', color: '#4C4C4C' }}>
                총 루틴 시간
              </PretendardedText>
            </View>
            <View style={{ flex: 1 }}>
              <PretendardedText
                style={{ marginLeft: 20, fontSize: 40, fontWeight: '900', color: '#3CE3AC' }}>
                +{Math.round((Date.parse(userState.completeTime) - Date.parse(userState.wakeUpTime)) / 1000 / 60)}
                <PretendardedText
                  style={{ marginLeft: 20, fontSize: 40, fontWeight: '500', color: '#222222' }}>
                  분
                </PretendardedText>
              </PretendardedText>
            </View>
            <View style={{ flex: 1 }}>
              <PretendardedText
                style={{ marginBottom: 3, marginLeft: 20, fontSize: 12, fontWeight: '700', color: '#808080' }}>
                <PretendardedText style={{ fontWeight: '900', color: '#595959' }}>
                  {wakeUpHour}시{' '}
                </PretendardedText>
                <PretendardedText style={{ fontWeight: '900', color: '#595959' }}>
                  {wakeUpMin}분
                </PretendardedText>
                에 일어나서
              </PretendardedText>
              <PretendardedText
                style={{ marginLeft: 20, fontSize: 12, fontWeight: '700', color: '#808080' }}>
                <PretendardedText style={{ fontWeight: '900', color: '#595959' }}>
                  {completeHour}시{' '}
                </PretendardedText>
                <PretendardedText style={{ fontWeight: '900', color: '#595959' }}>
                  {completeMin}분
                </PretendardedText>
                에 마쳐요.
              </PretendardedText>
            </View>
          </View>

          <View style={{ flex: 1}}>
            <Timer width='100%' height='100%'/>
            <View style={{ position: 'absolute', bottom: 10, right: 20 }}>
              <TouchableOpacity>
                <Text style={{ fontWeight: '600', fontSize: 12 }}>
                  수정하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.48,
    backgroundColor: '#F9F9F9',
  },
  totalbox: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 17,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
});

export default RoutineAddButton;
