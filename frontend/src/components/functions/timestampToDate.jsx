function timestampToDate(timestamp) {  
    if (timestamp && timestamp.seconds !== undefined) {  
        const date = new Date(timestamp.seconds * 1000);  
        return date.toLocaleDateString('en-US', {  
            year: 'numeric',  
            month: 'long',  
            day: 'numeric',  
        });  
    }  
    return null;  
};  
export default timestampToDate;