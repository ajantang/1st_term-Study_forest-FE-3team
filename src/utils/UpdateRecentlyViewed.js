function UpdateRecentlyViewed(studyId) {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const updatedRecentlyViewed = [studyId, ...recentlyViewed.filter((Id) => Id !== studyId)].slice(0, 5);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
}

// 각 page.js에 추가하시고 params로 받는 studyId를 값으로 넘겨주세요.
// UpdateRecentlyViewed(studyId)

export default UpdateRecentlyViewed