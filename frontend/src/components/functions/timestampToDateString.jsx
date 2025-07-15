function timestampToDateString(seconds) {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

export default timestampToDateString;