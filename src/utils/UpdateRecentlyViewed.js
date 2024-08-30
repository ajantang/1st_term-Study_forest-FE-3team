function UpdateRecentlyViewed(studyId) {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const updatedRecentlyViewed = [studyId, ...recentlyViewed.filter((Id) => Id !== studyId)].slice(0, 5);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
    console.log(1)
}

export default UpdateRecentlyViewed