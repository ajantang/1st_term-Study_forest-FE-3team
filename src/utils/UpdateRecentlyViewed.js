export function UpdateRecentlyViewed(studyId) {
  const recentlyViewed =
    JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  const updatedRecentlyViewed = [
    studyId,
    ...recentlyViewed.filter((Id) => Id !== studyId),
  ].slice(0, 5);
  localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecentlyViewed));
}

export function deleteRecentlyViewed(studyId) {
  const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed"));

  if (recentlyViewed) {
    return;
  }

  const updatedRecentlyViewed = [
    ...recentlyViewed.filter((Id) => Id !== studyId),
  ];

  localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecentlyViewed));
}
