const _ = require('underscore');

/**
 * Intersperses ads in a list of posts. Represents an "ad" as an object with a
 * single key, 'ad,' with the value 'true'.
 */
export const intersperseAds = (posts) => {
  return _.flatten([
    posts.slice(0, 1),
    {ad: true},
    posts.slice(1),
  ]);
};
