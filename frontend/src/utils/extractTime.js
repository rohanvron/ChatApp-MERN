export function extractTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padzero(date.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    hours = padzero(hours);

    return `${hours}:${minutes} ${ampm}`;
}

// function to pad a single digit num with a leading 0
function padzero(number) {
    return number.toString().padStart(2, '0');
}
