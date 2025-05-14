export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

export function extractDate(dateString) {
  const date = new Date(dateString);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const day = date.getUTCDate();
  const monthName = months[date.getUTCMonth()];
  return `${day} ${monthName}`;
}

// Вспомогательная функция для засечки однозначных чисел с начальным нулем
function padZero(number) {
	return number.toString().padStart(2, "0");
}