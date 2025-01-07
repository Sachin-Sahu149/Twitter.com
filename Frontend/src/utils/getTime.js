
const getTimeAgo = (timestamp) => {
    
    const now = new Date();
    const created = new Date(timestamp);
    const diffInSeconds = Math.floor((now - created) / 1000); // Difference in seconds

    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} h`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} d`;
    }
  };

export {
    getTimeAgo
}
// inute${minutes > 1 ? 's' : ''} ago
//our${hours > 1 ? 's' : ''} ago
//ay${days > 1 ? 's' : ''} ago