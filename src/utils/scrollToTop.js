import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//function to scroll to top, when navigating through pages
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
};
