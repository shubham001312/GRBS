// ============================================
// RESOURCE QUALITY RATINGS - Star Ratings
// ============================================

var RATINGS_KEY = 'grbs_resource_ratings';

function getResourceRatings() {
  try { return JSON.parse(localStorage.getItem(RATINGS_KEY) || '{}'); } catch (e) { return {}; }
}

function setResourceRating(url, rating) {
  var ratings = getResourceRatings();
  ratings[url] = { rating: rating, ratedAt: new Date().toISOString() };
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}

function getResourceRating(url) {
  var ratings = getResourceRatings();
  return ratings[url] ? ratings[url].rating : 0;
}

function getResourceRatingsCount() {
  return Object.keys(getResourceRatings()).length;
}

function renderResourceRating(url, compact) {
  var current = getResourceRating(url);
  if (compact) {
    var stars = '';
    for (var i = 1; i <= 5; i++) { stars += i <= current ? icon('star') : icon('starEmpty'); }
    return '<span class="resource-stars" onclick="event.stopPropagation();cycleResourceRating(\"' + encodeURIComponent(url) + '\")" title="Rate this resource" style="cursor:pointer;font-size:11px;">' + (current > 0 ? stars : '☆☆☆☆☆') + '</span>';
  }
  var starsHtml = '';
  for (var s = 1; s <= 5; s++) {
    starsHtml += '<span class="rating-star" onclick="event.stopPropagation();setResourceRating(\"' + encodeURIComponent(url) + '\"' + ',' + s + ');renderCurrentTab();" style="cursor:pointer;font-size:14px;color:' + (s <= current ? 'var(--accent-2)' : 'var(--border)') + ';">★</span>';
  }
  return '<div class="resource-rating" style="display:inline-flex;align-items:center;gap:2px;">' + starsHtml + (current > 0 ? '<span style="font-size:10px;color:var(--text-muted);margin-left:4px;">' + current + '/5</span>' : '') + '</div>';
}

function cycleResourceRating(encodedUrl) {
  var url = decodeURIComponent(encodedUrl);
  var current = getResourceRating(url);
  var next = current >= 5 ? 0 : current + 1;
  if (next > 0) {
    setResourceRating(url, next);
    showToast('Rated ' + next + '/5', 'success');
  } else {
    var ratings = getResourceRatings();
    delete ratings[url];
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    showToast('Rating cleared', 'info');
  }
}

function getTopRatedResources() {
  var ratings = getResourceRatings();
  var top = [];
  var entries = Object.entries(ratings);
  for (var i = 0; i < entries.length; i++) {
    var url = entries[i][0];
    var data = entries[i][1];
    if (data.rating >= 4) {
      for (var j = 0; j < PHASES.length; j++) {
        var res = PHASES[j].resources.find(function(r) { return r.url === url; });
        if (res) { top.push(Object.assign({}, res, { rating: data.rating, phaseId: PHASES[j].id })); break; }
      }
    }
  }
  return top.sort(function(a, b) { return b.rating - a.rating; });
}
