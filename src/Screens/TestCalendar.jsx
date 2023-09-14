// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// function GoogleCalendarDatePicker() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     setSelectedDate(date);
//     hideDatePicker();
//   };

//   return (
//     <View>
//       <TouchableOpacity onPress={showDatePicker}>
//         <Text>Select Date</Text>
//       </TouchableOpacity>
//       {selectedDate && (
//         <Text>Selected Date: {selectedDate.toDateString()}</Text>
//       )}
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </View>
//   );
// }

// export default GoogleCalendarDatePicker;
