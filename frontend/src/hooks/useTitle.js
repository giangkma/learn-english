import { useEffect, useState } from 'react';

// set title for component
function useTitle(title = 'English 247', isOverride = false) {
  useEffect(() => {
    if (isOverride) {
      document.title = title;
    } else {
      document.title =
        title !== 'English 247' ? `${title} - English 247` : title;
    }
  }, []);

  return null;
}

export default useTitle;
