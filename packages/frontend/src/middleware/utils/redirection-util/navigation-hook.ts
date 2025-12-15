import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { clearNavigation } from './navigation-slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

// custom hook listening for a change to the redux navigation.path
// if new path detected (handled in middleware), navigate moves the users, then the path is cleared so it doesnt run again
// this turns the redux action 'dispatch(navigateTo('/dashboard'))' into an actual react router navigation
// dispatch and navigate are safety dependencies. They return stable functions that rarely change, so are safe to inject into the dependency list

export const useReduxNavigation = () => {
  const path = useAppSelector(state => state.navigation.path);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (path) {
      navigate(path);
      dispatch(clearNavigation());
    }
  }, [dispatch, path, navigate]);
};
